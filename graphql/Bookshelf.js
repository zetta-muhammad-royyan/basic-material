const Bookshelf = {
  books: async (bookshelf, _, { bookLoader, user }) => {
    if (!user) throw new Error('Unauthenticated');
    return bookLoader.loadMany(bookshelf.books);
  },
};

module.exports = Bookshelf;
