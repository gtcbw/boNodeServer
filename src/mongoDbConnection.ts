// src/database.ts
import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'BoschTask';

let db: Db;

export const connectToDatabase = async ():Promise<Db> => {
  if (!db) {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
};