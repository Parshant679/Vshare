const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB_NAME = "vShare";
    await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
    console.log("\n Mongo Db database connected");
  } catch (err) {
    console.log("Error occure while connecting to DB");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
