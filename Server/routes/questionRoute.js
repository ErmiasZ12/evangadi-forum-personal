const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
} = require("../controller/questionController");

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controller/commentController");

// get all questions
router.get("/", authMiddleware, getAllQuestions);

// single question
router.get("/:question_id", getSingleQuestion);

// post a question
router.post("/post", authMiddleware, postQuestion);

/************* COMMENT SECTION MODIFIED *************/

// get all comments of a question
router.get("/:question_id/comments", getComments);

// add comment under a question
router.post("/:question_id/comment", authMiddleware, addComment);

// delete a comment (optional admin or comment owner only)
router.delete("/:question_id/comment/:comment_id", authMiddleware, deleteComment);

/****************************************************/

module.exports = router;
