import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
  console.log(connectionString)
  const client: MongoClient = await MongoClient.connect(connectionString);
  return client;
};
