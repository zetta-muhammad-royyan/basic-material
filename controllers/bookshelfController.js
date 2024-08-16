const Bookshelf = require("../models/bookshelf.js");
const mongoose = require("mongoose");

const createNewBookshelf = async (req, res) => {
  try {
    const newBookshelf = new Bookshelf(req.body);
    const savedBookshelf = await newBookshelf.save();
    res.status(201).json(savedBookshelf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBookshelves = async (req, res) => {
  try {
    const bookshelves = await Bookshelf.find().populate("books");
    res.json(bookshelves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookshelfByID = async (req, res) => {
  try {
    const bookshelf = await Bookshelf.findById(req.params.id).populate("books");
    if (!bookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    res.json(bookshelf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBookshelf = async (req, res) => {
  try {
    const updatedBookshelf = await Bookshelf.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("books");
    if (!updatedBookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    res.json(updatedBookshelf);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBookshelf = async (req, res) => {
  try {
    const deletedBookshelf = await Bookshelf.findByIdAndDelete(req.params.id);
    if (!deletedBookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    res.json({ message: "Bookshelf deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findBookshelfByBookID = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const bookshelves = await Bookshelf.find({
      books: { $eq: bookId },
    }).populate("books");

    if (bookshelves.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookshelves found containing this book" });
    }

    res.json(bookshelves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewBookshelf,
  getAllBookshelves,
  getBookshelfByID,
  updateBookshelf,
  deleteBookshelf,
  findBookshelfByBookID,
};
