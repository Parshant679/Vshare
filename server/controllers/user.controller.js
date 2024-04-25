const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Connection = require("../models/connection.model");
const { apiError } = require("../utils/ApiError");
const { apiResponse } = require("../utils/ApiResponse");

const userCtrl = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(401, "Invalid user credentials");
    }

    const isMatch = password.localeCompare(user.password) ? true : false;
    if (!isMatch) {
      throw new apiError(403, "incorrect password");
    }
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    delete user["password"];

    const options = {
      httpOnly: true,
      secure: false,
      path: "/",
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new apiResponse(200, "Login successfull", user));
  },

  register: async (req, res) => {
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
      .json(new apiResponse(200, "userCreated Successfully", createdUser));
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

    const connectionRequestId = req.query.id;

    const isConnnected = await Connection.findById({
      _id: connectionRequestId,
    });

    if (!isConnnected) {
      throw new apiError(404, "connection not Found");
    }
    const updateOperation = {
      $set: {
        connectionStatus: 1,
      },
    };

    const options = {
      new: true,
    };

    const updateConnection = await Connection.findByIdAndUpdate(
      { _id: connectionRequestId },
      updateOperation,
      options
    );

    if (!updateConnection) {
      throw new apiError(
        500,
        "some error accure while updating the connection request"
      );
    }
    return res
      .status(2001)
      .json(
        new apiResponse(
          200,
          "connection Request accepted",
          updateConnection.connectionStatus
        )
      );
  },

  sendConnectionRequest: async (req, res) => {
    // send the request
    console.log(req.body);
    const { source, destination, status } = req.body;

    const connection = new Connection({
      user1: source,
      user2: destination,
      status: status,
    });

    await connection.save();

    return res
      .status(201)
      .json(
        new apiResponse(
          200,
          "connection Request sent Successfully",
          connection._id
        )
      );
  },
  cancelConnectionRequest: async (req, res) => {
    // cancel the request

    const connectionId = req.query.id;
    const isConnnected = await Connection.findById({
      _id: connectionId,
    });

    if (!isConnnected) {
      throw new apiError(404, "connection not Found");
    }

    const deleteRequest = await Connection.deleteOne({ _id: connectionId });

    if (!deleteRequest) {
      throw new apiError(404, "connection not found");
    }

    return res
      .status(204)
      .json(200, "cancle Connection Request", deleteRequest);
  },
  searchUsers: async (req, res) => {
    const { searchText, pageNo } = req.query;
    const skipCount = (pageNo - 1) * 10;

    const users = await User.aggregate([
      {
        $match: { name: { $regex: searchText } },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          imageUrl: 1,
        },
      },
      {
        $sort: { name: 1 },
      },
      {
        $skip: skipCount,
      },
      { $limit: 10 },
    ]);

    if (!users) {
      throw new apiError(500, "Some Error Occure while retriving data");
    }
    return res
      .status(201)
      .json(new apiResponse(200, "data retrived successfully", users));
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
