const express = require("express");
const router = express.Router();

// User controllers
const { createUser } = require("../controller/userController");

/**
 * POST /api/users
 * Register new user
 */
router.post("/", createUser);
module.exports = router;
