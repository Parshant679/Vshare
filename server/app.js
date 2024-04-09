const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Router Imports
const videoRoutes = require("./routes/video.route");
const userRoutes = require("./routes/user.route");

// Routes
app.use("/user", userRoutes);
app.use("/api", videoRoutes);

module.exports = app;
