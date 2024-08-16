const { songs } = require('../songs.js');

const getPlaylistByArtist = (req, res) => {
  const { artist } = req.body;
  if (!artist) {
    return res.status(400).json({ message: 'Parameter artist name is required!' });
  }

  let groupedSongByArtist = songs.filter((song) => song.artist.toLocaleLowerCase() == artist.toLocaleLowerCase());

  return res.status(200).json({
    songs: groupedSongByArtist,
  });
};

const getPlaylistByGenre = (req, res) => {
  const { genre } = req.body;
  if (!genre) {
    return res.status(400).json({ message: 'Parameter genre is required!' });
  }

  let groupedSongByGenre = songs.filter((song) => song.genre.toLocaleLowerCase() == genre.toLocaleLowerCase());

  return res.status(200).json({
    songs: groupedSongByGenre,
  });
};

const getPlaylistWithRandomSong = (req, res) => {
  let copiedSong = [...songs];
  let randomIndex = Math.floor(Math.random() * copiedSong.length);
  let initSong = copiedSong.splice(randomIndex, 1)[0];
  let initDuration = calculateSecond(initSong.duration);
  let groupedSong = [initSong];
  while (true) {
    randomIndex = Math.floor(Math.random() * copiedSong.length);
    console.log('random index :', randomIndex);
    console.log('songs length :', copiedSong.length);
    let randomSong = copiedSong.splice(randomIndex, 1)[0];
    if (initDuration + calculateSecond(randomSong.duration) > 3600) {
      break;
    }

    groupedSong.push(randomSong);
    initDuration += calculateSecond(randomSong.duration);
  }

  let totalDuration = groupedSong.reduce((acc, cur) => acc + calculateSecond(cur.duration), 0);

  return res.status(200).json({
    playlist: {
      totalDuration: calculateDuration(totalDuration),
      songs: groupedSong,
    },
  });
};

function calculateSecond(duration) {
  const [minute, second] = duration.split(':');
  return parseInt(minute) * 60 + parseInt(second);
}

function calculateDuration(seconds) {
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${minutes}:${secs.toString().padStart(2, 0)}`;
}

module.exports = { getPlaylistByArtist, getPlaylistByGenre, getPlaylistWithRandomSong };
