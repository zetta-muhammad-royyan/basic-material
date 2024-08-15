const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    default: '',
  },
  title: {
    type: String,
    required: true,
    default: '',
  },
  genre: {
    type: String,
    required: true,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  on_sale: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Book', BookSchema);
