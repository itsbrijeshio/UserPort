const sendResponse = (res, statusCode = 200, rest) => {
  return res.status(statusCode).json({
    ...rest,
    success: true,
    status: statusCode,
    message: rest?.message || "Success",
  });
};

module.exports = sendResponse;
