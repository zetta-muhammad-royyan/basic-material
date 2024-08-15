const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    get_all_books(genre: String, author: String): [Book]
    get_book_by_id(_id: ID!): Book
    get_all_bookshelves: [Bookshelf]!
    get_bookshelf_by_id(_id: ID!): Bookshelf
    find_bookshelf_by_book_id(book_id: ID!): [Bookshelf]
  }

  type Mutation {
    create_book(author: String!, title: String!, genre: String!, price: Float!, stock: Int!, on_sale: Boolean): Book
    update_book(_id: ID!, author: String!, title: String!, genre: String!, price: Float!, stock: Int!, on_sale: Boolean): Book
    delete_book(_id: ID!): String
    create_bookshelf(name: String!, books: [ID]): Bookshelf
    update_bookshelf(_id: ID!, name: String, books: [ID]): Bookshelf
    delete_bookshelf(_id: ID!): String
  }

  type Book {
    _id: ID!
    author: String!
    title: String!
    genre: String!
    price: Float!
    stock: Int!
    on_sale: Boolean
  }

  type Bookshelf {
    _id: ID!
    name: String!
    books: [Book]!
  }
`;

module.exports = typeDefs;
