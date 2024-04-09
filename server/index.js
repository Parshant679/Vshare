const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});
const connectDB = require("./db/index");
// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(`server Started at PORT : ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("Error occure while connecting to DB");
//   });
app.listen(process.env.PORT || 8000, () => {
  console.log(`server Started at PORT : ${process.env.PORT}`);
});
