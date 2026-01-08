const crypto = require("crypto");
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const sendEmail = require("../utils/email");

/**
 * REGISTER USER
 */
async function createUser(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;

  if (!userName || !firstName || !lastName || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields required" });
  }
  // password is a string (coming from req.body)
  // .length is a built-in property of strings
  // It returns the number of characters in the string
  if (password.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Password must be 8+ chars" });
  }

  //Example query to get all admin users
  // const result = await dbConnection.query("SELECT user_id, email FROM users WHERE role = ?",["admin"]);

  //Sample response from database
  // result = [
  //   [
  //     { user_id: 1, email: "a@gmail.com" },
  //     { user_id: 3, email: "b@gmail.com" },
  //     { user_id: 7, email: "c@gmail.com" },
  //   ],
  //   [
  //     /* fields metadata */
  //   ],
  // ];
  //ONE array (rows) containing multiple objects
  // Each object = one database row
  // rows = [
  //   { user_id: 1, email: "a@gmail.com" },
  //   { user_id: 3, email: "b@gmail.com" },
  //   { user_id: 7, email: "c@gmail.com" },
  // ];
  // TWO array (fields) containing metadata about the columns
  // result=[
  // [ /* rows */ ],
  // [ /* fields metadata */ ]
  // ];

  //Destructuring to get the first array (rows) from result
  // const [rows, fields] = await dbConnection.query("SELECT user_id, email FROM users WHERE role = ?",["admin"]);
  //Destructuring to get the first object (first row) from rows
  // firstUser = rows[0];
  // const [[firstUser]] = await dbConnection.query("SELECT user_id, email FROM users WHERE role = ?",["admin"]);
  // firstUser = { user_id: 1, email: "a@gmail.com" };

  const [[existingUser]] = await dbConnection.query(
    "SELECT user_id FROM users WHERE email = ?",
    [email]
  );

  if (existingUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await dbConnection.query(
    `INSERT INTO users 
     (username, first_name, last_name, email, password)
     VALUES (?, ?, ?, ?, ?)`,
    [userName, firstName, lastName, email, hashedPassword]
  );

  res.status(StatusCodes.CREATED).json({ msg: "User registered successfully" });
}

/**
 * LOGIN USER
 */
async function login(req, res) {
  const { email, password } = req.body;
  const [[user]] = await dbConnection.query(
    "SELECT user_id, username, password FROM users WHERE email = ?",
    [email]
  );

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid credentials" });
  }
  //What dbConnection.query() returns
  //MySQL (mysql2) always returns:
  // [rows, fields];
  //Case: User EXISTS
  //[
  //  [
  //     {
  //       user_id: 5,
  //       username: "evangadiG1User",
  //       password: "$2a$10$abcxyz..."
  //     }
  //   ],
  //   [ /* fields metadata */ ]
  // ]

  // const [[user]] = await dbConnection.query(...);
  //This is equivalent to:
  // const result = await dbConnection.query(...);
  // const rows = result[0]; -----> First array
  // const user = rows[0]; -----> First object in the first array
  //so user = { user_id: 5, username: "evangadiG1User", password: "$2a$10$abcxyz..." }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { user_id: user.user_id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(StatusCodes.OK).json({
    msg: "Login successful",
    token,
    userId: user.user_id,
    username: user.username,
  });
}

//  FORGOT PASSWORD
async function forgotPassword(req, res) {
  const { email } = req.body;

  // Check if email is sent from the frontend
  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an email" });
  }

  try {
    // Check if email exists inside db
    const [rows] = await dbConnection.execute(
      "SELECT user_id, username FROM Users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Email not found" });
    }

    const user = rows[0];

    // Generate reset token and expiry (1 hour)
    const token = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    // Save token & expiry in DB
    await dbConnection.execute(
      "UPDATE Users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
      [token, resetTokenExpiry, email]
    );

    // Create reset link (change localhost to your frontend URL)
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Send email
    const emailSent = await sendEmail(
      email,
      "Password Reset Request",
      `Hello ${user.username},\n\nClick this link to reset your password (valid 1 hour):\n\n${resetLink}\n\nIf you did not request this, ignore this email.`
    );

    if (!emailSent) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Failed to send email. Try again later." });
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "Password reset link sent to your email" });
  } catch (error) {
    console.error("❌ forgotPassword error:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

//  RESET PASSWORD
async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a new password" });
  }

  try {
    // Find user with valid token
    const [rows] = await dbConnection.query(
      "SELECT user_id FROM Users WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token]
    );

    if (rows.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and remove token
    await dbConnection.query(
      `UPDATE Users
       SET password = ?, reset_token = NULL, reset_token_expiry = NULL
       WHERE reset_token = ?`,
      [hashedPassword, token]
    );

    res.status(StatusCodes.OK).json({ msg: "Password reset successful" });
  } catch (error) {
    console.error(" resetPassword error:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}
/**
 * CHECK USER
 */
async function checkUser(req, res) {
  const user_id = req.user.user_id;
  const username = req.user.username;

  res.status(StatusCodes.OK).json({
    msg: "Congratulations! you are a Valid user",
    userId: user_id,
    username: username,
  });
}

module.exports = {
  createUser,
  login,
  forgotPassword,
  resetPassword,
  checkUser,
};
