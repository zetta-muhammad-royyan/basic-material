const Playlist = {
  creator: (playlist, _, { userLoader }) => {
    return userLoader.load(playlist.creator);
  },
};

module.exports = Playlist;
