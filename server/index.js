const { app } = require("./app");
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});
const connectDB = require("./db/index");
connectDB();
app.listen(process.env.PORT || 8000, () => {
  console.log(`server Started at PORT : ${process.env.PORT}`);
});
