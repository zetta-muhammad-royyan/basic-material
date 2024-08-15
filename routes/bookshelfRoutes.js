const express = require("express");
const {
  createNewBookshelf,
  getAllBookshelves,
  getBookshelfByID,
  updateBookshelf,
  deleteBookshelf,
  findBookshelfByBookID,
} = require("../controllers/bookshelfController.js");

const bookshelfRoutes = express.Router();

bookshelfRoutes.post("/api/bookshelf", createNewBookshelf);
bookshelfRoutes.get("/api/bookshelf", getAllBookshelves);
bookshelfRoutes.get("/api/bookshelf/:id", getBookshelfByID);
bookshelfRoutes.put("/api/bookshelf/:id", updateBookshelf);
bookshelfRoutes.delete("/api/bookshelf/:id", deleteBookshelf);
bookshelfRoutes.get("/api/bookshelf/has/:bookId", findBookshelfByBookID);

module.exports = bookshelfRoutes;
