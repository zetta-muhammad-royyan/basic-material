const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    genre: String!
    stock: Int!
    price: Float!
    onSale: Boolean!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

module.exports = typeDefs;
