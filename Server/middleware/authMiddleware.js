const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authmiddleware(req, res, next) {
  //  Token comes from request header
  const authHeader = req.headers.authorization; // read token.
  // Authorization: Bearer eyJhbGciOiJIUzI1...

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authorization deniedd" });
  }
  const token = authHeader.split(" ")[1];
  try {
    // check the token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userid } = decoded;

    //  User info saved in and Controller can now use req.user.userid.
    req.user = { username, userid };
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
}
module.exports = authmiddleware;
