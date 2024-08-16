const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addNewSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongByGenres,
  getSongsWithPlaylist,
  statsGroupedSong,
} = require("../controllers/songController");

const songRoutes = express.Router();
songRoutes.use(authMiddleware);

songRoutes.post("/api/songs", addNewSong);
songRoutes.get("/api/songs", getAllSongs);
songRoutes.get("/api/songs/:id", getSongById);
songRoutes.put("/api/songs/:id", updateSong);
songRoutes.delete("/api/songs/:id", deleteSong);
songRoutes.post("/api/songs/genres", getSongByGenres);
songRoutes.get("/api/songs/playlist", getSongsWithPlaylist);
songRoutes.post("/api/songs/stats", statsGroupedSong);

module.exports = { songRoutes };
