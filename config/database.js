const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(
        `Connection established with database ${conn.connection.host}`
      );
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};
module.exports = dbConnection;
