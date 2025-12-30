const express = require("express");
const router = express.Router();

const { getAnswers, postAnswer } = require("../controller/answerController");



// GET all answers for a question
router.post("/", postAnswer);
router.get("/:question_id", getAnswers);

module.exports = router;
