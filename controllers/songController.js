const Song = require("../models/Song");

const addNewSong = async (req, res) => {
  const { title, artist, album, duration, playlistId, genre } = req.body;
  if (!title || !artist || !album || !duration || !genre) {
    return res.status(400).json({ message: "Parameters required" });
  }

  try {
    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      duration,
      playlistId,
    });
    await newSong.save();
    res
      .status(201)
      .json({ message: "Song created successfully", song: newSong });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create song", error });
  }
};

const getAllSongs = async (req, res) => {
  const { page = 1, sortBy = "title", sortOrder = "asc" } = req.query;

  try {
    const songs = await Song.aggregate([
      {
        $sort: {
          [sortBy]: sortOrder === "asc" ? 1 : -1,
        },
      },
      {
        $skip: (parseInt(page) - 1) * 5,
      },
      {
        $limit: 5,
      },
    ]);

    const totalSongs = await Song.countDocuments();

    res.status(200).json({
      totalSongs,
      totalPages: Math.ceil(totalSongs / 5),
      currentPage: parseInt(page),
      songs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve songs", error });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve song", error });
  }
};

const updateSong = async (req, res) => {
  const { title, artist, album, duration, playlistId, genre } = req.body;
  if (!title || !artist || !album || !duration || !genre) {
    return res.status(400).json({ message: "Parameters required" });
  }

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, album, duration, playlistId, genre },
      { new: true }
    );
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res
      .status(200)
      .json({ message: "Song updated successfully", song: updatedSong });
  } catch (error) {
    res.status(500).json({ message: "Failed to update song", error });
  }
};

const deleteSong = async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete song", error });
  }
};

const getSongByGenres = async (req, res) => {
  const { genres } = req.body;
  if (!Array.isArray(genres) || genres.length === 0) {
    return res
      .status(400)
      .json({ message: "Genres should be a non-empty array" });
  }

  try {
    const aggregationPipeline = [
      {
        $facet: genres.reduce((acc, genre) => {
          acc[genre] = [{ $match: { genre } }, { $sort: { title: 1 } }];
          return acc;
        }, {}),
      },
    ];

    const songsByGenre = await Song.aggregate(aggregationPipeline);

    res.status(200).json(songsByGenre[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve songs by genre", error });
  }
};

const getSongsWithPlaylist = async (req, res) => {
  try {
    const songsWithPlaylists = await Song.aggregate([
      {
        $lookup: {
          from: "playlists",
          localField: "playlistId",
          foreignField: "_id",
          as: "playlist",
        },
      },
    ]);

    res.status(200).json(songsWithPlaylists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve songs with playlist", error });
  }
};

const statsGroupedSong = async (req, res) => {
  const { parameter } = req.body;

  if (!["genre", "artist"].includes(parameter)) {
    return res
      .status(400)
      .json({ message: 'Invalid groupBy parameter. Use "genre" or "artist".' });
  }

  try {
    const songsGrouped = await Song.aggregate([
      {
        $group: {
          _id: `$${parameter}`,
          totalDuration: { $sum: "$duration" },
          songs: {
            $push: {
              title: "$title",
              artist: "$artist",
              album: "$album",
              duration: "$duration",
              genre: "$genre",
            },
          },
        },
      },
      {
        $sort: { totalDuration: -1 },
      },
    ]);

    res.status(200).json(songsGrouped);
  } catch (error) {
    res.status(500).json({ message: "Failed to group songs", error });
  }
};

module.exports = {
  addNewSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongByGenres,
  getSongsWithPlaylist,
  statsGroupedSong,
};
