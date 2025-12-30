

const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Get All Questions API when someone sends GET /api/question

async function getAllQuestions(req, res) {
  try {
    // Database Query
    const [questions] = await dbConnection.query(
      `SELECT 
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
   ORDER BY q.questionid DESC`
    );

    // Send Response
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


module.exports = { getAllQuestions};
