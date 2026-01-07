const crypto = require("crypto");
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");


//  GET ALL QUESTIONS

async function getAllQuestions(req, res) {
  const [questions] = await dbConnection.query(`
    SELECT 
      questions.question_id,
      questions.title,
      questions.description,
      questions.tags,
      questions.user_id,
      users.username,
      COUNT(answers.answer_id) AS answerCount
    FROM questions
    INNER JOIN users 
      ON questions.user_id = users.user_id
    LEFT JOIN answers 
      ON questions.question_id = answers.question_id
    GROUP BY questions.question_id
    ORDER BY questions.question_id DESC
  `);

  res.status(StatusCodes.OK).json({
    count: questions.length,
    questions,
  });
}


  // GET SINGLE QUESTION
 
async function getSingleQuestion(req, res) {
  const { question_id } = req.params;

  const [[question]] = await dbConnection.query(
    `
    SELECT 
      questions.*,
      users.username
    FROM questions
    INNER JOIN users
      ON questions.user_id = users.user_id
    WHERE questions.question_id = ?
    `,
    [question_id]
  );

  if (!question) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Question not found" });
  }

  res.status(StatusCodes.OK).json({ question });
}


  // POST QUESTION

async function postQuestion(req, res) {
  const { title, description, tags } = req.body;
  const user_id = req.user.user_id;

  await dbConnection.query(
    `INSERT INTO questions (user_id, title, description, tags)
     VALUES (?, ?, ?, ?)`,
    [user_id, title, description, tags]
  );

  res.status(StatusCodes.CREATED).json({ msg: "Question created successfully" });
}

// EDIT QUESTION
// PUT /api/questions/:question_id
async function editQuestion(req, res) {
  const { question_id } = req.params;
  const { title, description } = req.body;
  const user_id = req.user.user_id;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "title and description are required" });
  }

  try {
    const [result] = await dbConnection.query(
      `
      UPDATE Questions
      SET title = ?, description = ?, updated_at = NOW()
      WHERE question_id = ? AND user_id = ?
      `,
      [title, description, question_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Not allowed to edit this question" });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Question updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}

// DELETE QUESTION
// DELETE /api/questions/:question_id
async function deleteQuestion(req, res) {
  const { question_id } = req.params;
  const user_id = req.user.user_id;

  try {
    // delete answers first
    await dbConnection.query("DELETE FROM Answers WHERE question_id = ?", [
      question_id,
    ]);

    // delete question
    const [result] = await dbConnection.query(
      "DELETE FROM Questions WHERE question_id = ? AND user_id = ?",
      [question_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Not allowed to delete this question" });
    }

    res.status(StatusCodes.OK).json({
      msg: "Question deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}


module.exports = { 
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  editQuestion,
  deleteQuestion,
};
