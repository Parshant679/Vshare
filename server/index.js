const app = require("./app");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});
const connectDB = require("./db/index");
app.use(cors());
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server Started at PORT : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occure while connecting to DB");
  });
