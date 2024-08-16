const Book = require("../models/book.js");
const Bookshelf = require("../models/bookshelf.js");

const Query = {
  getAllBooks: async (parent, args, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      return await Book.find();
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getBookByID: async (_, { id }, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      const book = await Book.findById(id);
      if (!book) throw new Error("Book not found");
      return book;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getAllBookshelves: async (parent, args, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      return await Bookshelf.find();
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getBookshelfByID: async (_, { id }, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      const bookshelf = await Bookshelf.findById(id);
      if (!bookshelf) throw new Error("Bookshelf not found");
      return bookshelf;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  findBookshelfByBookID: async (_, { bookId }, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error("Invalid book ID");
      }

      const bookshelves = await Bookshelf.find({
        books: { $eq: bookId },
      });

      if (bookshelves.length === 0) {
        throw new Error("No bookshelves found containing this book");
      }

      return bookshelves;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Query;
