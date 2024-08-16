const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getAllBooks: [Book]
    getBookByID(id: ID!): Book
    getAllBookshelves: [Bookshelf]
    getBookshelfByID(id: ID!): Bookshelf
    findBookshelfByBookID(bookId: ID!): [Bookshelf]
  }

  type Mutation {
    createNewBook(
      title: String!
      genre: String!
      price: Float!
      stock: Int!
    ): Book
    updateBook(
      id: ID!
      title: String!
      genre: String!
      price: Float!
      stock: Int!
    ): Book
    deleteBook(id: ID!): String
    createNewBookshelf(name: String!, books: [ID!]): Bookshelf
    updateBookshelf(id: ID!, name: String, books: [ID!]): Bookshelf
    deleteBookshelf(id: ID!): String
  }

  type Book {
    id: ID!
    title: String!
    genre: String!
    price: Float!
    stock: Int!
    onSale: Boolean
  }

  type Bookshelf {
    id: ID!
    name: String!
    books: [Book]!
  }
`;

module.exports = typeDefs;
