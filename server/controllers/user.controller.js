const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { apiError } = require("../utils/ApiError");
const { apiResponse } = require("../utils/ApiResponse");

const userCtrl = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(401, "Invalid user credentials");
    }
    console.log(user.password);
    console.log(req.body);
    const isMatch = password.localeCompare(user.password) ? true : false;

    console.log("Is Match", isMatch);
    if (!isMatch) {
      throw new apiError(403, "incorrect password");
    }
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    delete user["password"];

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new apiResponse(200, "Login successfull", user));
  },

  register: async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    // add image Url after words

    const existedUser = await User.findOne({
      $or: [{ email: email }, { name: name }],
    });

    if (existedUser) {
      return new apiError(
        409,
        "User with email already exists with this email"
      );
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      // /  imageUrl: imageUrl,
    });
    await user.save();

    const createdUser = await User.findById({ _id: user._id }).select(
      "-password"
    );

    if (!createdUser) {
      throw new apiError(500, "Some error occure while creating a user");
    }

    return res
      .status(201)
      .json(
        new apiResponse(200, "userCreated Successfully", createdUser, true)
      );
  },
  logout: (req, res) => {
    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new apiResponse(200, "logout successfull"));
  },
  getUserdata: async (req, res) => {
    const user_id = req.query.id;
    console.log(user_id);
    const user = await User.findOne({ _id: user_id }).select("-password");

    if (!user) {
      throw new apiError(404, "user not Found");
    }
    return res
      .status(200)
      .json(new apiResponse(200, "data retrived successfully", user));
  },

  acceptConnectionRequest: async (req, res) => {
    // we will accept the request
  },

  sendConnectionRequest: async (req, res) => {
    // send the request
  },
  cancelConnectionRequest: async (req, res) => {
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
