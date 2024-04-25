const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
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
