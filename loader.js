const DataLoader = require('dataloader');
const Song = require('./models/Song');
const User = require('./models/User');

const createSongLoader = () => {
  return new DataLoader(async (songIds) => {
    const songs = await Song.find({ _id: { $in: songIds } });
    const songMap = {};
    songs.forEach((song) => {
      songMap[song._id] = song;
    });
    return songIds.map((id) => songMap[id]);
  });
};

const createUserLoader = () => {
  return new DataLoader(async (userIds) => {
    const users = await User.find({ _id: { $in: userIds } });
    // console.log(users);
    const userMap = users.reduce((map, user) => {
      map[user._id] = user;
      return map;
    }, {});
    console.log(userMap);

    return userIds.map((id) => userMap[id]);
  });
};

module.exports = {
  createSongLoader,
  createUserLoader,
};
