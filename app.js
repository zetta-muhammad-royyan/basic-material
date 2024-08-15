const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/";
const database = "test-database";

mongoose
  .connect(`${url}${database}`, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connection to MongoDB, Error:", error));
