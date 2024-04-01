const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: Object,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
});

module.exports = new mongoose.model("User", userSchema);
