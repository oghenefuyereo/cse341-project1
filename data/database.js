const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then(client => {
      _db = client.db(); // store the database instance, not the client
      callback(null, _db);
    })
    .catch(err => callback(err));
};

const getDatabase = () => {
  if (!_db) {
    throw new Error("Database not initialized!");
  }
  return _db;
};

module.exports = {
  initDb,
  getDatabase
};
