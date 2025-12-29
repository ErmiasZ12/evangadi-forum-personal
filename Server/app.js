require("dotenv").config();
const express = require("express");
const cors = require("cors"); //
const app = express();
const port = process.env.PORT;
const userRouter = require("./server/routes/userRoute");
const questionRouter = require("./server/routes/questionRoute");
const answerRouter = require("./server/routes/answerRoute");

app.use(cors()); //middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`)); //
