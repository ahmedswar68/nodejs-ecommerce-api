const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const router =require("./routes/categoryRoute");

dbConnection();
const app = express();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use('/api/v1/categories',router);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`running port ${PORT}`);
});
