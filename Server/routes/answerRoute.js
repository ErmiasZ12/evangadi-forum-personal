const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { getAnswers, postAnswer } = require("../controller/answerController");

router.get("/:question_id", getAnswers);
router.post("/postAnswers",authMiddleware, postAnswer);

module.exports = router;
