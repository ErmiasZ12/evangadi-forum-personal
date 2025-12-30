const crypto = require("crypto");
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

/**
 * ================================
 *  GET ALL QUESTIONS  (GET /api/question)
 * ================================
 * Returns:
 *  - Total count
 *  - Array of question objects
 * Includes:
 *  - Username of creator
 *  - Number of answers per question
 */
async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `
      SELECT 
        q.questionid,
        q.title,
        q.description,
        q.tag,
        q.userid,
        u.username,
        COUNT(a.answerid) AS answerCount
      FROM questions q
      JOIN users u ON q.userid = u.userid
      LEFT JOIN answers a ON q.questionid = a.questionid
      GROUP BY q.questionid
      ORDER BY q.questionid DESC
      `
    );

    return res.status(StatusCodes.OK).json({
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}

/**
 * ================================
 *   GET SINGLE QUESTION (GET /api/question/:question_id)
 * ================================
 * Validation:
 *  - question_id is required
 * Response:
 *  - Question details
 *  - Username of owner
 */
async function getSingleQuestion(req, res) {
  const { question_id } = req.params;

  if (!question_id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "question_id is required" });
  }

  try {
    const [[question]] = await dbConnection.query(
      `
      SELECT 
        q.questionid,
        q.title,
        q.description,
        q.tag,
        u.userid,
        u.username
      FROM Questions q
      JOIN Users u ON q.userid = u.userid
      WHERE q.questionid = ?
      `,
      [question_id]
    );

    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }

    return res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}

/**
 * ================================
 *   CREATE QUESTION (POST /api/question)
 * ================================
 * Requires:
 *  - Authenticated user
 *  - title, description
 * Auto-generate:
 *  - questionid using crypto
 */
async function postQuestion(req, res) {
  const questionid = crypto.randomBytes(8).toString("hex");
  const { title, description, tag } = req.body;
  const userid = req.user.userid; // retrieved from auth middleware

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "title and description are required" });
  }

  try {
    await dbConnection.query(
      `
      INSERT INTO questions (questionid, title, description, tag, userid)
      VALUES (?, ?, ?, ?, ?)
      `,
      [questionid, title, description, tag, userid]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}

module.exports = {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
};
