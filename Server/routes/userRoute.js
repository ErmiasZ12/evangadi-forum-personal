const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createUser,
  login,
  checkUser,
} = require("../controller/userController");

router.post("/register", createUser);
router.post("/login", login);
router.get("/check", authMiddleware, checkUser);

module.exports = router;
