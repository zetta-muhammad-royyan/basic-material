const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes.js");
const bookshelfRoutes = require("./routes/bookshelfRoutes.js");

mongoose
  .connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(bodyParser.json());
app.use(bookRoutes);
app.use(bookshelfRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
