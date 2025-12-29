const express = require("express");
const app = express();
require("dotenv").config();

const answerRoutes = require("./routes/answerRoute");
app.use("/api/answer", authMiddleware, answerRoutes);