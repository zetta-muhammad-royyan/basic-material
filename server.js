const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { makeExecutableSchema } = require("graphql-tools");

const Query = require("./graphql/Query");
const Mutation = require("./graphql/Mutation");
const Bookshelf = require("./graphql/Bookshelf");
const typeDefs = require("./graphql/typeDefs");
const bookLoader = require("./dataloader");
const getUser = require("./graphql/getUser");

mongoose
  .connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

mongoose.set("debug", true);

const app = express();
let schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Bookshelf,
  },
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const authHeader = req.headers["authorization"];
    let user = getUser(authHeader);

    return {
      req,
      bookLoader,
      user,
    };
  },
});

server.applyMiddleware({ app });

app.listen(7777, () => {
  console.log("Server running on port 7777");
  console.log(`GraphQL server running at http://localhost:7777/graphql`);
});
