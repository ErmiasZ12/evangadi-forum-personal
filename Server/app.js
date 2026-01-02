require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");


const app = express();
const port = process.env.PORT;

app.use(cors());
  // CORS = Cross-Origin Resource Sharing.
  // cors() is a middleware from the cors package.
  // By default, it allows all origins to make requests to your server.

// app.use(cors({
//   origin: "http://localhost:3000"
// }));
    // Only requests from http://localhost:3000 are allowed
    // Others will get blocked by the browser

app.use(express.json());
    // What is express.json()?
      // It’s a built-in middleware in Express.
      // Parses incoming requests with JSON payloads.
      // Converts raw JSON in the request body to a JavaScript object in req.body.

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/questions",authMiddleware, require("./routes/questionRoute"));

app.use("/api/answers", authMiddleware, require("./routes/answerRoute"));


// Test route
app.get("/", (req, res) => {
  res.send("Group-1 2025: Evangadi Forum API is running...");
});



app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
