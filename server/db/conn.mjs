import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let db;

const connectDB = async () => {
  const client = new MongoClient(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db("web-pizza"); 
  console.log("MongoDB connection SUCCESS");
};

const getDB = () => {
  if (!db) {
    throw new Error("DB not connected");
  }

  return db;
};

const out = { connectDB, getDB };
export default out;
