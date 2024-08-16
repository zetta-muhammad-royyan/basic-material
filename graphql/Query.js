const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const mongoose = require('mongoose');

const Query = {
  // Song
  getAllSongs: async (_, { page = 1, sortBy = 'title', sortOrder = 'asc' }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    const songs = await Song.aggregate([{ $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } }, { $skip: (page - 1) * 5 }, { $limit: 5 }]);

    const totalSongs = await Song.countDocuments();
    return {
      totalSongs,
      totalPages: Math.ceil(totalSongs / 5),
      currentPage: page,
      songs,
    };
  },

  getSongById: async (_, { id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    const song = await Song.findById(id);
    if (!song) throw new Error('Song not found');
    return song;
  },

  getSongsWithPlaylist: async (parent, args, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    const songsWithPlaylists = await Song.aggregate([
      {
        $lookup: {
          from: 'playlists',
          localField: 'playlistId',
          foreignField: '_id',
          as: 'playlist',
        },
      },
    ]);

    return songsWithPlaylists.map((song) => ({
      song,
      playlist: song.playlist[0] || null,
    }));
  },

  statsGroupedSong: async (_, { parameter }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    if (!['genre', 'artist'].includes(parameter)) {
      throw new Error('Invalid groupBy parameter. Use "genre" or "artist".');
    }

    const songsGrouped = await Song.aggregate([
      {
        $group: {
          _id: `$${parameter}`,
          totalDuration: { $sum: '$duration' },
          songs: {
            $push: {
              _id: '$_id',
              title: '$title',
              artist: '$artist',
              album: '$album',
              duration: '$duration',
              genre: '$genre',
            },
          },
        },
      },
      { $sort: { totalDuration: -1 } },
    ]);

    return songsGrouped;
  },
  //   End Song

  // playlist
  playlists: async (_, { page = 1, limit = 10 }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const playlists = await Playlist.aggregate([
        { $skip: (parseInt(page) - 1) * parseInt(limit) },
        { $limit: parseInt(limit) },
        {
          $lookup: {
            from: 'songs',
            localField: 'songIds',
            foreignField: '_id',
            as: 'songs',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        { $unwind: '$creator' },
        {
          $project: {
            songIds: 0,
          },
        },
      ]);

      const totalPlaylists = await Playlist.countDocuments();
      return {
        totalPlaylists,
        totalPages: Math.ceil(totalPlaylists / limit),
        currentPage: parseInt(page),
        playlists,
      };
    } catch (error) {
      throw new Error('Failed to retrieve playlists');
    }
  },
  playlist: async (_, { id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const playlist = await Playlist.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'songs',
            localField: 'songIds',
            foreignField: '_id',
            as: 'songs',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        { $unwind: '$creator' },
        {
          $project: {
            songIds: 0,
          },
        },
      ]);

      if (playlist.length === 0) {
        throw new Error('Playlist not found');
      }

      return playlist[0];
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve playlist');
    }
  },
  // end playlist
};

module.exports = Query;
