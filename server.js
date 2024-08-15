const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { playlistRoutes } = require("./routes/playlistRoutes.js");
const { songRoutes } = require("./routes/songRoutes.js");
const { authRoutes } = require("./routes/authRoutes.js");

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);
app.use(songRoutes);
app.use(playlistRoutes);

mongoose
  .connect("mongodb://localhost:27017/soundcloud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
