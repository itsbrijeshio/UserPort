const asyncHandler = require("./asyncHandler");

const validateRequest = (schema, source = "body") => {
  return asyncHandler(async (req, res, next) => {
    await schema.parseAsync(req[source]);
    next();
  });
};

module.exports = validateRequest;
