const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log("entering cors");
app.use(
  cors()
  //   {
  //    origin: "*",
  //    credentials: true,
  //  }
);

//Router Imports
const videoRoutes = require("./routes/video.route");
const userRoutes = require("./routes/user.route");

// Routes
app.get("/", (req, res) => {
  res.send("welcome to backend");
});
app.use("/api/user", userRoutes);
app.use("/api", videoRoutes);

module.exports = { app };
