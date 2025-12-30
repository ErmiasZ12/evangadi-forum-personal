const express = require("express");
const router = express.Router();

// User controllers
const {
  createUser,
  login,
  checkUser,
} = require("../controller/userController");

/**
 * POST /api/users
 * Register new user
 */
router.post("/", createUser);
// login user, calls the login function
router.post("/login",login);

// register route
router.get("/check",authmiddleware , checkUser);

module.exports = router;
