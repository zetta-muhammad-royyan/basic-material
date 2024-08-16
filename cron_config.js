const updateSongPlayedStatus = require('./cron_function');

module.exports = [
  {
    name: 'UPDATE_PLAYED_STATUS_IN_SONG',
    when: 'Every 1 minute',
    crontab: '* * * * *',
    function: updateSongPlayedStatus,
  },
];
