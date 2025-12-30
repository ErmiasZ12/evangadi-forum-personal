const dbConnection = require("../db/dbConfig");
const statusCodes = require("http-status-codes");

// ================= GET ANSWERS FOR A QUESTION =================
async function getAnswers(req, res) {
  const { question_id } = req.params;

  // 1️⃣ Validate question_id
  if (!question_id || isNaN(question_id)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ msg: "Invalid question_id" });
  }

  try {
    // 2️⃣ Fetch answers from DB
    const [answers] = await dbConnection.query(
      `SELECT 
         a.answerId, 
         a.answer, 
         a.answeredAt, 
         u.userId, 
         u.username 
       FROM answers a
       JOIN users u ON a.userId = u.userId
       WHERE a.questionId = ?
       ORDER BY a.answeredAt ASC`,
      [question_id]
    );

    // 3️⃣ If no answers found
    if (answers.length === 0) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ msg: "No answers found for this question" });
    }

    // 4️⃣ Send response
    return res.status(statusCodes.OK).json({
      questionId: parseInt(question_id),
      totalAnswers: answers.length,
      answers,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}
async function postAnswer(req, res) {
  const { questionid, answer, tag } = req.body;
  const userid = req.user.userid; // from auth middleware

  // Validation
  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "questionid and answer are required" });
  }

  try {
    // Insert answer
    await dbConnection.query(
      `INSERT INTO Answers (questionid, userid, answer, tag)
       VALUES (?, ?, ?, ?)`,
      [questionid, userid, answer, tag]
    );

    // Success response
    return res.status(StatusCodes.CREATED).json({
      msg: "Answer posted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}

module.exports = { postAnswer, getAnswers };
