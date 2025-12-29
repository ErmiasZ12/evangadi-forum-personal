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


//adjusted
