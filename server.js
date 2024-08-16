const express = require('express');
const bodyParser = require('body-parser');
const { songRoutes } = require('./routes/playlistRoutes.js');
const { authRoutes } = require('./routes/authRoutes.js');
const { authMiddleware } = require('./middlewares/authMiddleware.js');

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);
app.use(authMiddleware, songRoutes);

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
