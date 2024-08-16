const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers.js");

mongoose
  .connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const app = express();
let schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: (req) => ({
    req: req.req,
  }),
});

server.applyMiddleware({ app });

app.use(bodyParser.json());

app.listen(8080, () => {
  console.log("Server running on port 8080");
  console.log(`GraphQL server running at http://localhost:8080/graphql`);
});
