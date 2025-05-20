const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const { env } = require("../config");
const { AppError } = require("../utils");
const { httpStatus, message } = require("../constants");

const authGuard = asyncHandler(async (req, res, next) => {
  const headerToken = req.headers?.authorization?.split(" ")[1];
  const token = req.cookies?.token || headerToken;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
  }

  const decoded = await jwt.verify(token, env.JWT_SECRET);
  req.auth = decoded;
  if (!req.auth) {
    throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
  }

  next();
});

module.exports = authGuard;
