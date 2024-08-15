const express = require("express");
const {
  createNewBook,
  getAllBooks,
  getBookByID,
  updateBook,
  deleteBook,
} = require("../controllers/bookController.js");

const bookRoutes = express.Router();

bookRoutes.get("/api/books", getAllBooks);
bookRoutes.post("/api/books", createNewBook);
bookRoutes.get("/api/books/:id", getBookByID);
bookRoutes.put("/api/books/:id", updateBook);
bookRoutes.delete("/api/books/:id", deleteBook);

module.exports = bookRoutes;
