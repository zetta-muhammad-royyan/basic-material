const Book = require('../models/book.js');
const Bookshelf = require('../models/bookshelf.js');
const mongoose = require('mongoose');

const Query = {
  get_all_books: async (parent, { genre, author }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const match = {};
      if (genre) match.genre = genre;
      if (author) match.author = author;

      if (Object.keys(match).length === 0) {
        return await Book.find();
      }

      return await Book.aggregate([{ $match: match }]);
    } catch (err) {
      console.error('Error retrieving books:', err);
      throw new Error('Failed to retrieve books');
    }
  },
  get_book_by_id: async (_, { _id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const book = await Book.findById(_id);
      if (!book) throw new Error('Book not found');
      return book;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  get_all_bookshelves: async (parent, args, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      return await Bookshelf.find();
    } catch (err) {
      throw new Error(err.message);
    }
  },
  get_bookshelf_by_id: async (_, { _id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const bookshelf = await Bookshelf.findById(_id);
      if (!bookshelf) throw new Error('Bookshelf not found');
      return bookshelf;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  find_bookshelf_by_book_id: async (_, { book_id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      if (!mongoose.Types.ObjectId.isValid(book_id)) {
        throw new Error('Invalid book ID');
      }

      const bookshelves = await Bookshelf.find({
        books: { $eq: book_id },
      });

      if (bookshelves.length === 0) {
        throw new Error('No bookshelves found containing this book');
      }

      return bookshelves;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Query;
