import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const clientConection = await MongoClient.connect(process.env.CNN_DB);
  return clientConection;
}

export async function connectToDatabaseEvent() {
  const clientConection = await MongoClient.connect(process.env.DB_EVENT);
  return clientConection;
}
