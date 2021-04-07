require("dotenv").config({ path: `${__dirname}/config/config.env.${process.env.NODE_ENV}`});
require('./config/aws');

const path = require('path');
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const models = require('./models/index')
const {ApolloServer, PubSub} = require('apollo-server-express');
const {mergeTypeDefs, mergeResolvers, loadFilesSync} = require('graphql-tools');
const cors = require('cors');
const attachUserToRequest = require("./utils/middleware/attachUserToRequest");
const AuthDirective = require("./graphql/directives/AuthDirective");
const app = express();
const pubSub = new PubSub(); // PubSub instance for subscriptions

// Add Middleware
// --------------
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
app.use(express.json({ limit: "10mb", type: "application/json" }));



// Compile Schema Files
// --------------------
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "graphql", "typeDefs"))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "graphql", "resolvers"))
);


// Create Apollo Server
// --------------------
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    await getUserFromRequest(req)
    return { req, res, pubSub};
  },
  schemaDirectives: {
    auth: AuthDirective
  },
});


// Bind Apollo to Express
// ----------------------
apolloServer.applyMiddleware({ app, cors: false });


// Configure GraphQL Subscriptions
// -------------------------------
const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);


const port = 8000;
httpServer.listen(port, () => {
  console.log(`🚀 Server is up at http://localhost:${port} ...`);
  console.log(
    `🚀 GraphQL server is up at http://localhost:${port}${apolloServer.graphqlPath} ...`
  );
  console.log(
    `🚀 GraphQL subscriptions are up at ws://localhost:${port}${apolloServer.subscriptionsPath} ...`
  );
  console.log('ENVIRONMENT CONFIG:', process.env.NODE_ENV)
});
