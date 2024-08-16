const express = require('express');
const { getPlaylistByArtist, getPlaylistByGenre, getPlaylistWithRandomSong } = require('../controllers/playlistController.js');

const songRoutes = express.Router();

songRoutes.post('/song/artist', getPlaylistByArtist);
songRoutes.post('/song/genre', getPlaylistByGenre);
songRoutes.post('/song/random', getPlaylistWithRandomSong);

module.exports = { songRoutes };
