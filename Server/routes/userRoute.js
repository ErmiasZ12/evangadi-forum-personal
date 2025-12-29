const express = require("express");
const router = express.Router();


// User controllers
const { createUser } = require("../controllers/userController");

/**
 * POST /api/users
 * Register new user
 */
router.post("/", createUser);
