const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createUser,
  login,
  checkUser,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

router.post("/register", createUser);
router.post("/login", login);

// forgot password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/check", authMiddleware, checkUser);

module.exports = router;
