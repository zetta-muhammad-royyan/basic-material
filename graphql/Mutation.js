const validateBookData = require('../helpers/validateData');
const Book = require('../models/book');
const Bookshelf = require('../models/bookshelf');

const Mutation = {
  create_book: async (_, { title, genre, price, stock, on_sale, author }, { user }) => {
    validateBookData({ title, genre, price, stock, on_sale, author });
    if (!user) throw new Error('Unauthenticated');
    try {
      const newBook = new Book({ title, genre, price, stock, on_sale, author });
      return await newBook.save();
    } catch (err) {
      throw new Error(err.message);
    }
  },
  update_book: async (_, { _id, title, genre, price, stock, on_sale, author }, { user }) => {
    validateBookData({ title, genre, price, stock, on_sale, author });
    if (!user) throw new Error('Unauthenticated');
    try {
      const updatedBook = await Book.findByIdAndUpdate(_id, { title, genre, price, stock, on_sale, author }, { new: true });
      if (!updatedBook) throw new Error('Book not found');
      return updatedBook;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  delete_book: async (_, { _id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const deletedBook = await Book.findByIdAndDelete(_id);
      if (!deletedBook) throw new Error('Book not found');
      return 'Book deleted';
    } catch (err) {
      throw new Error(err.message);
    }
  },
  create_bookshelf: async (_, { name, books }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const newBookshelf = new Bookshelf({ name, books });
      return await newBookshelf.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update_bookshelf: async (_, { _id, name, books }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const updatedBookshelf = Bookshelf.findByIdAndUpdate(_id, { name, books }, { new: true });

      if (!updatedBookshelf) throw new Error('Bookshelf not found');
      return updatedBookshelf;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  delete_bookshelf: async (_, { _id }, { user }) => {
    if (!user) throw new Error('Unauthenticated');
    try {
      const deletedBookshelf = Bookshelf.findByIdAndDelete(_id);
      if (!deletedBookshelf) throw new Error('Bookshelf not found');
      return 'Book deleted';
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = Mutation;
