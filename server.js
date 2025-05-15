const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
//config env file
dotenv.config();

//databse call
connectDb();
// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/users", require("./routes/userRoute"));
//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
