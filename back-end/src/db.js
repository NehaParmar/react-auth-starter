import { MongoClient } from "mongodb";

let client;

export const initializeDbConnection = async () => {
  // client = await MongoClient.connect("mongodb://0.0.0.0:27017", {
  client = await MongoClient.connect("mongodb://0.0.0.0:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
