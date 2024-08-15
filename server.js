import express from "express";
import bodyParser from "body-parser";
import { songRoutes } from "./routes/playlistRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);
app.use(authMiddleware, songRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
