const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require("mongodb");

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Db is already initialized!");
    return callback(null, database);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return callback(new Error("MONGODB_URI is not defined in .env"));
  }

  MongoClient.connect(uri)
    .then((client) => {
      database = client.db(); // uses the default DB from URI
      // Removed duplicate console.log here
      return callback(null, database);
    })
    .catch((err) => callback(err));
};

const getDb = () => {
  if (!database) {
    throw new Error("Database is not initialized!");
  }
  return database;
};

module.exports = {
  initDb,
  getDb,
};
