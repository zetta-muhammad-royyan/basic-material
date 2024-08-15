const mongoose = require("mongoose");
const Playlist = require("../models/Playlist");

const createNewPlaylist = async (req, res) => {
  const { name, description, songs } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Parameter name required" });
  }

  try {
    const newPlaylist = new Playlist({
      name,
      description,
      creator: req.user.userId,
      songIds: songs,
    });
    await newPlaylist.save();
    res.status(201).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create playlist", error });
  }
};

const getAllPlaylist = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const playlists = await Playlist.aggregate([
      {
        $skip: (parseInt(page) - 1) * parseInt(limit),
      },
      {
        $limit: parseInt(limit),
      },
      {
        $lookup: {
          from: "songs",
          localField: "songIds",
          foreignField: "_id",
          as: "songs",
        },
      },
      {
        $project: {
          songIds: 0,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
      {
        $project: {
          songs: 1,
          "creator.name": 1,
          "creator.username": 1,
          name: 1,
          description: 1,
        },
      },
    ]);

    const totalPlaylists = await Playlist.countDocuments();

    res.status(200).json({
      totalPlaylists,
      totalPages: Math.ceil(totalPlaylists / limit),
      currentPage: parseInt(page),
      playlists,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve playlists", error });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "songs",
          localField: "songIds",
          foreignField: "_id",
          as: "songs",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
      {
        $project: {
          songs: 1,
          "creator.name": 1,
          "creator.username": 1,
          name: 1,
          description: 1,
        },
      },
    ]);

    if (playlist.length === 0) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve playlist", error });
  }
};

const updatePlaylist = async (req, res) => {
  const { name, description, songs } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Parameter name required" });
  }

  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { name, description, songIds: songs },
      { new: true }
    );
    if (!updatedPlaylist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({
      message: "Playlist updated successfully",
      playlist: updatedPlaylist,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update playlist", error });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    if (!deletedPlaylist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete playlist", error });
  }
};

module.exports = {
  createNewPlaylist,
  getAllPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
