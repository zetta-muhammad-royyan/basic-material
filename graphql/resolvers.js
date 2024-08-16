const Book = require("../models/book");

const resolvers = {
  Query: {
    books: () => Book.find(),
    book: (_, { id }) => Book.findById(id),
  },
  Mutation: {
    addBook: (_, { title, author, genre }) => {
      const book = new Book({ title, author, genre });
      return book.save();
    },
  },
};

module.exports = resolvers;
