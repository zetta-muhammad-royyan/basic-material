const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

const Mutation = {
  // user
  login: async (_, { username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Invalid Credentials');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid Credentials');

      const token = jwt.sign({ userId: user._id, name: user.name }, 'rahasia', {
        expiresIn: '1h',
      });

      return { token };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  register: async (_, { name, username, email, password }) => {
    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, 'rahasia', {
        expiresIn: '1h',
      });

      return { token };
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  // End user

  // Song
  addNewSong: async (_, { title, artist, album, genre, duration, playlistId }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    if (!title || !artist || !album || !duration || !genre) {
      throw new Error('Parameters required');
    }

    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      duration,
      playlistId,
    });
    await newSong.save();

    return {
      message: 'Song created successfully',
      song: newSong,
    };
  },

  updateSong: async (_, { id, title, artist, album, genre, duration, playlistId }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    if (!title || !artist || !album || !duration || !genre) {
      throw new Error('Parameters required');
    }

    const updatedSong = await Song.findByIdAndUpdate(id, { title, artist, album, genre, duration, playlistId }, { new: true });

    if (!updatedSong) {
      throw new Error('Song not found');
    }

    return {
      message: 'Song updated successfully',
      song: updatedSong,
    };
  },

  deleteSong: async (_, { id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      throw new Error('Song not found');
    }

    return { message: 'Song deleted successfully' };
  },

  // playlist
  createPlaylist: async (_, { name, description, songs }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    if (!name) {
      throw new Error('Parameter name required');
    }

    try {
      const newPlaylist = new Playlist({
        name,
        description,
        creator: user.userId,
        songIds: songs,
      });
      await newPlaylist.save();
      return newPlaylist;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create playlist');
    }
  },
  updatePlaylist: async (_, { id, name, description, songs }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    if (!name) {
      throw new Error('Parameter name required');
    }

    try {
      const updatedPlaylist = await Playlist.findByIdAndUpdate(id, { name, description, songIds: songs }, { new: true });
      if (!updatedPlaylist) {
        throw new Error('Playlist not found');
      }
      return updatedPlaylist;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to update playlist');
    }
  },
  deletePlaylist: async (_, { id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const deletedPlaylist = await Playlist.findByIdAndDelete(id);
      if (!deletedPlaylist) {
        throw new Error('Playlist not found');
      }
      return true;
    } catch (error) {
      throw new Error('Failed to delete playlist');
    }
  },
  // end playlist
};

module.exports = Mutation;
