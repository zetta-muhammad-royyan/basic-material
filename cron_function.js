const Song = require('./models/Song');

const updateSongPlayedStatus = async () => {
  console.log('cron for updated played status is running');
  try {
    const updatedSong = await Song.findOneAndUpdate(
      { played: false },
      { $set: { played: true } },
      {
        new: true,
        sort: { title: 1 },
      }
    );

    console.log(updatedSong);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports = updateSongPlayedStatus;
