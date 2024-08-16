const Book = require("../models/book.js");

const createNewBook = async (req, res) => {
  try {
    const { title, price, stock, genre } = req.body;
    if (!title || !price || !stock || !genre) {
      return res.status(400).json({ message: "Parameters required" });
    }

    const newBook = new Book({ title, genre, price, stock });
    const savedBook = await newBook.save();

    return res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookByID = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, price, stock, genre } = req.body;
    if (!title || !price || !stock || !genre) {
      return res.status(400).json({ message: "Parameters required" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, genre, price, stock },
      {
        new: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewBook,
  getAllBooks,
  getBookByID,
  updateBook,
  deleteBook,
};
