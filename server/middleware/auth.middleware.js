const jwt = require("jsonwebtoken");

const auth = (req, res) => {
  try {
    const token = req.headers("Authorization");

    if (!token) {
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      req.user = user;
      next();
    });
  } catch (err) {}
};

module.exports = auth;
