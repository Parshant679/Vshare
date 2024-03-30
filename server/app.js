const express = require("express");
const cors = require("cors");
const app = new express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(400).json({ msg: "on the Server" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started at", PORT);
});
