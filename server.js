const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const router = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

dbConnection();
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//ROUTES MOUNT
app.use("/api/v1/categories", router);

app.all("*", (req, res,next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
})

// GOLABLE ERROR HANDLING MIDDLEWARE
app.use(globalError);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`running port ${PORT}`);
});
