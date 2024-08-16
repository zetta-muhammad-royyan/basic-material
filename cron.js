const { CronJob } = require('cron');
const Song = require('./models/Song');

const job = new CronJob('*/1 * * * *', async () => {
  console.log('job running');
  try {
    const updatedSong = await Song.findOneAndUpdate({ played: false }, { $set: { played: true } }, { new: true });
    console.log(updatedSong);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
});

module.exports = job;
