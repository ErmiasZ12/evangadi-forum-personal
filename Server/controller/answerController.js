const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

/**
 * GET ANSWERS
 */
async function getAnswers(req, res) {
  const { question_id } = req.params;

  const [answers] = await dbConnection.query(
    `
    SELECT 
      answers.answer_id,
      answers.answer,
      users.username
    FROM answers
    INNER JOIN users
      ON answers.user_id = users.user_id
    WHERE answers.question_id = ?
    `,
    [question_id]
  );

  res.status(StatusCodes.OK).json({
    count: answers.length,
    answers,
  });
}

/**
 * POST ANSWER
 */
async function postAnswer(req, res) {
  const { question_id, answer } = req.body;
  const user_id = req.user.user_id; // from auth middleware

  // Validation
  if (!question_id || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "question_id and answer are required" });
  }
  try {
    // Insert answer
    await dbConnection.query(
      `INSERT INTO answers (question_id, user_id, answer)
     VALUES (?, ?, ?)`,
      [question_id, user_id, answer]
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

module.exports = { getAnswers, postAnswer };
