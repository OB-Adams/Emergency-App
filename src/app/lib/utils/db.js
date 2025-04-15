const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongo_url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "auth_db";

if (!mongo_url) {
  throw new Error("❌ Missing MONGO_URI in .env file");
}

let client;
let db;
let usersCollection;
let adminUsersCollection;

const connectDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(mongo_url, {
        serverSelectionTimeoutMS: 50000, 
        socketTimeoutMS: 50000,
      });

      await client.connect();
      console.log(`✅ Connected to MongoDB Atlas: ${dbName}`);

      db = client.db(dbName);
      usersCollection = db.collection("users");
      adminUsersCollection = db.collection("admin_users"); 
    }

    return { db, usersCollection, adminUsersCollection };
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("Database connection failed");
  }
};

module.exports = { connectDB, usersCollection, adminUsersCollection };
