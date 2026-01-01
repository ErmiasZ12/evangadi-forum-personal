const jwt = require("jsonwebtoken");
const dbConnection = require("../db/dbConfig");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization denied" });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
      // const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
          // // 4️⃣ Check user exists
          // const [[user]] = await dbConnection.query(
          //   "SELECT user_id, username FROM users WHERE user_id = ?",
          //   [user_id]
          // );

          // if (!user) {
          //   return res.status(401).json({ msg: "Invalid token or user not found" });
          // }

    //destructuring to get user data from decoded token
    const { user_id, username } = jwt.verify(token, process.env.JWT_SECRET);
    //jwt.verify() does two things:
      // 1. Validates the token's signature and expiration. 
      //2. Decodes the token payload and returns it.
             // So, decodedUserData = { user_id: 5, username: "evangadiG1User", iat: 1697059200, exp: 1697145600 }


        // return res.status(200).json({ msg: "User is authenticated", user: { user_id, username } });

    // 5️⃣ Attach user to request

      // create custom property 'user' in req object and set it to user data
      req.user = {
        user_id: user_id,
        username: username,
      };
      
      next();

  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = authMiddleware;
