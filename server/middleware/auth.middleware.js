const jwt = require("jsonwebtoken");
const { apiError } = require("../utils/ApiError");

const auth = (req, res) => {
  try {
    const token = req.cookies?.accessToken;
    console.log(token);

    if (!token) {
      throw new apiError(401, "Unauthorized request");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    throw new apiError(401, err?.message || "Invalid access token");
  }
};

module.exports = auth;
