const DataLoader = require('dataloader');
const Book = require('./models/book');

const bookLoader = new DataLoader(async (bookIds) => {
  const books = await Book.find({ _id: { $in: bookIds } });

  const bookMap = {};
  books.forEach((book) => {
    bookMap[book._id] = book;
  });

  return bookIds.map((id) => bookMap[id] || null);
});

module.exports = bookLoader;
