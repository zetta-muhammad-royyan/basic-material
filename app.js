const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// const startServer = async () => {
const app = express();
let schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: (req) => ({
    req: req.req,
  }),
});

server.applyMiddleware({ app });

mongoose.connect("mongodb://localhost:27017/testgraphql", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(8080, () => {
  console.log(`GraphQL server running at http://localhost:8080/graphql`);
});

// };
