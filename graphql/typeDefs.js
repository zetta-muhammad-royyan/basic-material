const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    genre: String!
    price: Float!
    stock: Int!
    onSale: Boolean
  }

  type Query {
    getAllBooks: [Book]
    getBookByID(id: ID!): Book
  }

  type Mutation {
    createNewBook(
      title: String!
      genre: String!
      price: Float!
      stock: Int!
      onSale: Boolean
    ): Book
    updateBook(
      id: ID!
      title: String!
      genre: String!
      price: Float!
      stock: Int!
      onSale: Boolean
    ): Book
    deleteBook(id: ID!): String
  }
`;

module.exports = typeDefs;
