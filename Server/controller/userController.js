const bcrypt = require("bcryptjs");
const pool = require("../db/dbConfig");

/**
 * REGISTER USER
 */
exports.createUser = (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  // Validation
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters" });
  }

  // Check if email exists
  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ msg: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user
    const sql = `
        INSERT INTO users (username, firstname, lastname, email, password)
        VALUES (?, ?, ?, ?, ?)
      `;

    pool.query(
      sql,
      [username, firstname, lastname, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ msg: "Database error" });

        return res.status(201).json({
          msg: "User registered successfully",
          userId: result.insertId,
        });
      }
    );
  });
};


async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fileds" });
  }
  try {
    // Search user with email and Return username, userid, and hashed password.

    const [user] = await dbConnection.query(
      "SELECT username,userid, password FROM Users WHERE email = ?",
      [email]
    );
    //  If no user found with this email, Login fails
    if (user.length == 0) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "invalid credential" });
    }
    // compare the actual with bcript password return boolean.
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    // Extract user info from DB.
    const username = user[0].username;
    const userid = user[0].userid;

    // Create token, Store username & userid inside, Sign with secret key, Token expires in 1 day
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token, username });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "someting went wrong, try again later!" });
  }
}

async function checkUser(req, res) {
  const { username, userid } = req.user;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = {login, checkUser };

//adjusted
