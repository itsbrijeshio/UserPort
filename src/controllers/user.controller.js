const { asyncHandler } = require("../middlewares");
const { sendResponse } = require("../utils");
const { userService } = require("../services");
const { httpStatus, message: messages } = require("../constants");

class UserController {
  handleGetMe = asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const user = await userService.getMe(id);
    const statusCode = httpStatus.OK;
    sendResponse(res, statusCode, { user });
  });

  handleUpdateMe = asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { name } = req.body;
    const user = await userService.updateMe(id, { name });
    const message = messages.USER_UPDATED;
    const statusCode = httpStatus.OK;
    sendResponse(res, statusCode, { user, message });
  });

  handleChangePassword = asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { oldPassword, newPassword } = req.body;
    const user = await userService.changePassword(id, {
      oldPassword,
      newPassword,
    });
    const message = messages.USER_CHANGED_PASSWORD;
    const statusCode = httpStatus.OK;
    sendResponse(res, statusCode, { user, message });
  });

  handleDeleteMe = asyncHandler(async (req, res) => {
    const { id } = req.auth;
    await userService.deleteMe(id);
    res.clearCookie("token");
    const message = messages.USER_DELETED;
    const statusCode = httpStatus.OK;
    sendResponse(res, statusCode, { message });
  });
}

module.exports = new UserController();
