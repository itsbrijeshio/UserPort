const { Router } = require("express");
const {userController} = require("../../controllers");

const router = Router();

router.get("/me", userController.handleGetMe);
router.put("/me", userController.handleUpdateMe);
router.put("/change-password", userController.handleChangePassword);
router.delete("/me", userController.handleDeleteMe);

module.exports = router;
