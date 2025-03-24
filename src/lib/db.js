const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Missing MONGO_URI in .env file");
}

const dbName = process.env.DB_NAME || "auth_db";

let client;
let clientPromise;

async function connectDB() {
  if (!clientPromise) {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    clientPromise = client
      .connect()
      .then(() => {
        console.log(`✅ Connected to MongoDB Atlas: ${dbName}`);
        return client.db(dbName);
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
      });
  }

  return clientPromise;
}

module.exports = connectDB;
