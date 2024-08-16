const Book = require("../models/book.js");

const resolvers = {
  Query: {
    getAllBooks: async () => {
      try {
        return await Book.find();
      } catch (err) {
        throw new Error(err.message);
      }
    },
    getBookByID: async (_, { id }) => {
      try {
        const book = await Book.findById(id);
        if (!book) throw new Error("Book not found");
        return book;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Mutation: {
    createNewBook: async (_, { title, genre, price, stock, onSale }) => {
      try {
        const newBook = new Book({ title, genre, price, stock, onSale });
        return await newBook.save();
      } catch (err) {
        throw new Error(err.message);
      }
    },
    updateBook: async (_, { id, title, genre, price, stock, onSale }) => {
      try {
        const updatedBook = await Book.findByIdAndUpdate(
          id,
          { title, genre, price, stock, onSale },
          { new: true }
        );
        if (!updatedBook) throw new Error("Book not found");
        return updatedBook;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    deleteBook: async (_, { id }) => {
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) throw new Error("Book not found");
        return "Book deleted";
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
