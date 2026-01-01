const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
} = require("../controller/questionController");

router.get("/allQuestions",getAllQuestions);
router.get("/:question_id", getSingleQuestion);
router.post("/post",postQuestion);

module.exports = router;
