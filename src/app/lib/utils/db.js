const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongo_url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "auth_db"; // Default fallback DB name

if (!mongo_url) {
  throw new Error("❌ Missing MONGO_URI in .env file");
}

let client;
let db;
let usersCollection;

const connectDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(mongo_url, {
        serverSelectionTimeoutMS: 50000, // Ensures MongoDB server is found within 50s
        socketTimeoutMS: 50000, // Prevents socket hangups
      });

      await client.connect();
      console.log(`✅ Connected to MongoDB Atlas: ${dbName}`);

      db = client.db(dbName);
      usersCollection = db.collection("users"); // Assigning a collection for usage
    }

    return { db, usersCollection };
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("Database connection failed");
  }
};

module.exports = { connectDB, usersCollection };
