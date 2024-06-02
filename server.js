const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const router = require("./routes/categoryRoute");

dbConnection();
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//ROUTES MOUNT
app.use("/api/v1/categories", router);

// GOLABLE ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(400).json({ err });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`running port ${PORT}`);
});
