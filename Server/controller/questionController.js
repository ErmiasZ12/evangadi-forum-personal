const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// 1. GET ALL QUESTIONS
async function getAllQuestions(req, res) {
  try {
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
      INNER JOIN users ON questions.user_id = users.user_id
      LEFT JOIN answers ON questions.question_id = answers.question_id
      GROUP BY questions.question_id
      ORDER BY questions.question_id DESC
    `);

    res.status(StatusCodes.OK).json({
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
}

// 2. GET SINGLE QUESTION
async function getSingleQuestion(req, res) {
  const { question_id } = req.params;
  try {
    const [[question]] = await dbConnection.query(
      `SELECT questions.*, users.username FROM questions 
       INNER JOIN users ON questions.user_id = users.user_id 
       WHERE questions.question_id = ?`,
      [question_id]
    );

    if (!question) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
    }
    res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
}

// 3. POST QUESTION (Fixed to include tags)
async function postQuestion(req, res) {
  const { title, description, tags } = req.body; // Added 'tags' from frontend
  const user_id = req.user.user_id;

  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Title and description are required" });
  }

  try {
    // ADDED 'tags' to the query below
    await dbConnection.query(
      `INSERT INTO questions (user_id, title, description, tags) VALUES (?, ?, ?, ?)`,
      [user_id, title, description, tags]
    );

    res.status(StatusCodes.CREATED).json({ msg: "Question created successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
}

// 4. EDIT QUESTION (Fixed to include tags)
async function editQuestion(req, res) {
  const { question_id } = req.params;
  const { title, description, tags } = req.body; // Added 'tags'
  const user_id = req.user.user_id;

  try {
    // ADDED 'tags = ?' to the update
    const [result] = await dbConnection.query(
      `UPDATE questions SET title = ?, description = ?, tags = ? 
       WHERE question_id = ? AND user_id = ?`,
      [title, description, tags, question_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Not allowed" });
    }
    res.status(StatusCodes.OK).json({ msg: "Question updated successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
}

// 5. DELETE QUESTION (Simplified)
async function deleteQuestion(req, res) {
  const { question_id } = req.params;
  const user_id = req.user.user_id;

  try {
    // Note: If you used 'ON DELETE CASCADE' in your SQL, 
    // you don't actually need to delete answers manually here!
    const [result] = await dbConnection.query(
      "DELETE FROM questions WHERE question_id = ? AND user_id = ?",
      [question_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Not allowed" });
    }
    res.status(StatusCodes.OK).json({ msg: "Question deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
}

module.exports = { getAllQuestions, getSingleQuestion, postQuestion, editQuestion, deleteQuestion };