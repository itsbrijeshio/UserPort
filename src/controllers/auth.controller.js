const { asyncHandler } = require("../middlewares");
const { sendResponse, signCookie } = require("../utils");
const { userService } = require("../services");
const { httpStatus, message: messages } = require("../constants");

class AuthController {
  handleSignup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.signup(name, email, password);
    const message = messages.USER_CREATED;
    const statusCode = httpStatus.CREATED;
    sendResponse(res, statusCode, { user, message });
  });

  handleSignin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.signin(email, password);
    const token = await signCookie(res, user);
    const statusCode = httpStatus.OK;
    sendResponse(res, statusCode, { token });
  });

  handleSignout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    const message = messages.USER_SIGNOUT;
    const statusCode = httpStatus.OK;
    sendResponse(res, statusCode, { message });
  });
}

module.exports = new AuthController();
