require("dotenv").config();
const express = require("express");
const cors = require("cors"); //
const app = express();
const port = process.env.PORT;
const userRouter = require("./routes/userRoute");
const questionRouter = require("./routes/questionRoute");
const answerRouter = require("./routes/answerRoute");

app.use(cors()); //middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/answer", answerRouter);
app.listen(port, () => console.log(`Listening at http://localhost:${port}`)); //
