const uri  = process.env.MONGO_URI
const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASS
const connectionString = `mongodb+srv://${user}:${pass}@${uri}`


const MongoClient = require('mongodb').MongoClient;
let db;

const initDb = () => {
  if (db) {
    console.log('Database is already initialized!');
    return;
  }
  MongoClient.connect(connectionString)
    .then((client) => {
      db = client;
      console.log('Database initialized');
    })
    .catch((err) => {
      console.error(err);
      process.exit(1); 
    });
};

const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};

module.exports = { initDb, getDb };