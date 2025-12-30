require("dotenv").config();
const express = require("express");
const cors = require("cors"); //
const app = express();
const port = process.env.PORT;

const userRouter = require("./routes/userRoute");
const questionRouter = require("./routes/questionRoute");
const answerRouter = require("./routes/answerRoute");
// authentication middleware file
const authMiddleware = require("./middleware/authMiddleware")


app.use(cors()); //middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/users", userRouter);
app.use("/api/questions", authMiddleware, questionRoute);
app.use("/api/answer",authMiddleware, answerRouter);
app.listen(port, () => console.log(`Listening at http://localhost:${port}`)); //


