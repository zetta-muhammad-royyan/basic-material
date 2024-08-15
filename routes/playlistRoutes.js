const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const {
  getAllPlaylist,
  getPlaylistById,
  createNewPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playlistController.js");

const playlistRoutes = express.Router();
playlistRoutes.use(authMiddleware);

playlistRoutes.post("/api/playlists", createNewPlaylist);
playlistRoutes.get("/api/playlists", getAllPlaylist);
playlistRoutes.get("/api/playlists/:id", getPlaylistById);
playlistRoutes.put("/api/playlists/:id", updatePlaylist);
playlistRoutes.delete("/api/playlists/:id", deletePlaylist);

module.exports = { playlistRoutes };
