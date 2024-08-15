const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const basicAuthMiddleware = require('./authMiddleware');

mongoose.connect('mongodb://localhost:27017/lb_sound', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  album: String,
  duration: Number,
  played: Boolean,
});

const Song = mongoose.model('Song', songSchema);

app.use(bodyParser.json());
app.use(basicAuthMiddleware);

app.put('/api/songs/:id', async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  try {
    const updatedSong = await Song.findByIdAndUpdate({ _id: id }, { title }, { new: true });
    if (!updatedSong) return res.status(404).json('Song not found');

    const requestBodyToWebhook = {
      song: updatedSong,
      auth: req.user,
    };

    const response = await fetch('https://webhook.site/69aec399-9d07-4e2d-a604-18b2bdb8690b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBodyToWebhook),
    });

    const contentType = response.headers.get('content-type');
    let result;
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    console.log(result);

    // Kirim respons sukses
    res.status(200).send('Song updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(8080, () => {
  console.log('server running on port 8080');
});
