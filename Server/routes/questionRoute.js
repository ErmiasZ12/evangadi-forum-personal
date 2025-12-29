

const {getAllQuestions} = require("../controller/questionController");

// routes to GET /api/question, check User must be logged in, then calls getAllquestions

router.get("/", authMiddleware, getAllQuestions);


module.exports = router;
