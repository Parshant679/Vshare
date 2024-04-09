const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usermodel = require("../models/user.model");
const userCtrl = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (!user) {
      //return error
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      // return password didnt match
    }
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.cookie("refreshToken", refreshToken);
  },
  register: async (req, res) => {
    // registe user
  },

  getUserdata: async (req, res) => {
    const user = await usermodel.findOne({ _id: req.user._id });
    res.send(user);
  },

  acceptRequest: async (req, res) => {
    // we will accept the request
  },

  sendRequest: async (req, res) => {
    // send the request
  },
  cancelRequest: async (req, res) => {
    // cancel the request
  },
};

const createAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return accessToken;
};

const createRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return refreshToken;
};

module.exports = userCtrl;
