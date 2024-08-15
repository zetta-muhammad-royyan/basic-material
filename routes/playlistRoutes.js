import express from "express";
import {
  getPlaylistByArtist,
  getPlaylistByGenre,
  getPlaylistWithRandomSong,
} from "../controllers/playlistController.js";

const songRoutes = express.Router();

songRoutes.post("/song/artist", getPlaylistByArtist);
songRoutes.post("/song/genre", getPlaylistByGenre);
songRoutes.post("/song/random", getPlaylistWithRandomSong);

export { songRoutes };
