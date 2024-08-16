const Mutation = {
  createNewBook: async (_, { title, genre, price, stock }, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      const newBook = new Book({ title, genre, price, stock });
      return await newBook.save();
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateBook: async (_, { id, title, genre, price, stock }, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, genre, price, stock },
        { new: true }
      );
      if (!updatedBook) throw new Error("Book not found");
      return updatedBook;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteBook: async (_, { id }, { user }) => {
    if (!user) throw new Error("Unauthenticated");
    try {
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) throw new Error("Book not found");
      return "Book deleted";
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
