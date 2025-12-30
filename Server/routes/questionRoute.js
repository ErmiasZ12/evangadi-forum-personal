
const express = require("express");
const router = express.Router();

const {
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// routes to GET /api/question, check User must be logged in, then calls getAllquestions
router.get("/", authMiddleware, getAllQuestions);

// GET single question
router.get("/:question_id", getSingleQuestion);


module.exports = router;
