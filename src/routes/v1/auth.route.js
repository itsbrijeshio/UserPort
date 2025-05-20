const { Router } = require("express");
const { authController } = require("../../controllers");
const { validateRequest } = require("../../middlewares");
const { signinSchema, signupSchema } = require("../../schema/user.schema");

const router = Router();

router.post(
  "/signup",
  validateRequest(signupSchema),
  authController.handleSignup
);
router.post(
  "/signin",
  validateRequest(signinSchema),
  authController.handleSignin
);
router.get("/signout", authController.handleSignout);

module.exports = router;
