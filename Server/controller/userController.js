const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

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

  //1️⃣ Example query to get all admin users
  // const result = await dbConnection.query("SELECT user_id, email FROM users WHERE role = ?",["admin"]);

  //2️⃣ Sample response from database
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

  //3️⃣ Destructuring to get the first array (rows) from result
    // const [rows, fields] = await dbConnection.query("SELECT user_id, email FROM users WHERE role = ?",["admin"]);
  //4️⃣ Destructuring to get the first object (first row) from rows
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

  const token = jwt.sign({ user_id: user.user_id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(StatusCodes.OK).json({
    msg: "Login successful",
    token,
    userId: user.user_id,
    username: user.username,
  });
}

/**
 * CHECK USER
 */
async function checkUser(req, res) {

  const user_id=req.user.user_id;
  const username=req.user.username;

  res.status(StatusCodes.OK).json({
    msg: "Congratulations! you are a Valid user",
    userId: user_id,
    username: username,
  });
}

module.exports = { createUser, login, checkUser };
