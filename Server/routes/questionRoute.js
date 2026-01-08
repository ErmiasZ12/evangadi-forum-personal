const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  editQuestion,
  deleteQuestion,
} = require("../controller/questionController");

router.get("/",getAllQuestions);
router.get("/:question_id", getSingleQuestion);
router.post("/post", authMiddleware, postQuestion);
// EDIT question
router.put("/:question_id", authMiddleware, editQuestion);

// DELETE question
router.delete("/:question_id",authMiddleware, deleteQuestion);

module.exports = router;
