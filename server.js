const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools');
const { CronJob } = require('cron');

const typeDefs = require('./graphql/typeDefs');
const Mutation = require('./graphql/Mutation');
const Query = require('./graphql/Query');
const Playlist = require('./graphql/Playlist');
const authMiddleware = require('./middlewares/authMiddleware');
const { createSongLoader, createUserLoader } = require('./loader');
const cronConfig = require('./cron_config');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/soundcloud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

mongoose.set('debug', true);

const crons = {};
mongoose.connection.on('connected', () => {
  cronConfig.forEach((config) => {
    const cronJob = new CronJob(config.crontab, config.function);
    crons[config.name] = cronJob;
    cronJob.start();
  });
});

let schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Playlist,
  },
});

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let user = null;
    try {
      user = await authMiddleware(req.headers['authorization']);
    } catch (error) {
      console.log(error);
    }

    return {
      req,
      user,
      crons,
      userLoader: createUserLoader(),
      songLoader: createSongLoader(),
    };
  },
});

server.applyMiddleware({ app });

app.listen(8080, () => {
  console.log('Server running on port 8080');
  console.log(`GraphQL server running at http://localhost:8080/graphql`);
});
