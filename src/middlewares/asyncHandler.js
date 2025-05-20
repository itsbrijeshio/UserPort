const { ZodError } = require("zod");
const jwt = require("jsonwebtoken");
const { AppError, logger } = require("../utils");
const { httpStatus, message } = require("../constants");

const formatZodError = (zodError) => {
  return zodError.issues.reduce((acc, issue) => {
    const path = issue.path.join(".");
    acc[path] = {
      code: issue.code, // e.g., 'invalid_type'
      message: issue.message, // e.g., 'Expected string, got number'
      expected: issue.expected, // (Optional) Expected type
      received: issue.received, // (Optional) Received type
    };
    return acc;
  }, {});
};

const defaultErrorFormatter = (error) => {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message,
      ...error.rest,
    };
  } else if (error instanceof ZodError) {
    return {
      status: httpStatus.BAD_REQUEST,
      message: message.VALIDATION_ERROR,
      errors: formatZodError(error),
    };
  } else if (
    error instanceof
    (jwt.JsonWebTokenError || jwt.TokenExpiredError || jwt.NotBeforeError)
  ) {
    return {
      status: httpStatus.UNAUTHORIZED,
      message: message.UNAUTHORIZED,
    };
  } else {
    return {
      status: httpStatus.SERVER_ERROR,
      message: message.SERVER_ERROR,
    };
  }
};

const asyncHandler = (handler, errorFormatter = defaultErrorFormatter) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      const { status, ...rest } = errorFormatter(error);

      if (status === 5000) {
        logger.error(
          `${error.message} - ${req.url} - ${req.method} - ${req.ip}`
        );
      }

      return res.status(status).json({
        ...rest,
        status,
        success: false,
      });
    }
  };
};

module.exports = asyncHandler;
