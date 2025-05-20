class AppError extends Error {
  constructor(statusCode, message, ...rest) {
    super(message);
    this.statusCode = statusCode;
    this.rest = rest;
  }
}

module.exports = AppError;
