const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Author', AuthorSchema);
