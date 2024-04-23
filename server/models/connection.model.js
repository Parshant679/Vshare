const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Object,
    require: true,
    default: null,
  },
  name: {
    type: String,
    required: true,
    default: null,
  },
});
const connectionSchema = new mongoose.Schema({
  user1: {
    type: userSchema,
    require: true,
    default: null,
  },
  user2: {
    type: userSchema,
    require: true,
    default: null,
  },
  connectionStatus: {
    type: Number,
    default: -1,
    required: true,
  },
});

module.exports = mongoose.model("Connection", connectionSchema);
