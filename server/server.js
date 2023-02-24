const express = require("express");
const path = require("path");
const db = require("./config/connection");
const dotenv = require("dotenv").config();
//const routes = require('./routes');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const app = express();
const PORT = process.env.PORT || 3001;

const { authMiddleware } = require("./utils/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
server.start().then((res) => {
  server.applyMiddleware({ app });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

//app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
