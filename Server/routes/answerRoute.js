const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { getAnswers, postAnswer, editAnswer, deleteAnswer } = require("../controller/answerController");

router.post("/postAnswers", authMiddleware, postAnswer);
router.put("/:answer_id", authMiddleware, editAnswer);
router.delete("/:answer_id", authMiddleware, deleteAnswer);
router.get("/:question_id", getAnswers);

module.exports = router;
