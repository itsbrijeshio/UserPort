const { Router } = require("express");
const { authGuard } = require("../../middlewares");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const router = Router();

router.use("/auth", authRoute);
router.use("/users", authGuard, userRoute);

module.exports = router;
