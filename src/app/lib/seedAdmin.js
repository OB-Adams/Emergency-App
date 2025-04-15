require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://obobadams:kRLl42M3BzSIXlvl@cluster0.mtf9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log("Mongo URI:", process.env.MONGO_URI);

const dbName = process.env.DB_NAME || "auth_db";

const client = new MongoClient(uri);

const rawAdmins = [
  { email: "policedepartment@gmail.com", password: "SecurePass123!" },
  { email: "fireservicedepartment@gmail.com", password: "FireAdmin456#" },
  { email: "ambulancedepartment@gmail.com", password: "Ambulance789$" },
  { email: "emergencydispatch@gmail.com", password: "Dispatch321@" },
  { email: "coordinationsquad@gmail.com", password: "CoordSquad007!" },
  { email: "disasterresponseunit@gmail.com", password: "DisasterRescue999*" },
];

const shouldSeed = false;
if (shouldSeed) {
  async function seedAdmins() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("admin_users");

      const hashedAdmins = await Promise.all(
        rawAdmins.map(async (admin) => ({
          email: admin.email,
          password: await bcrypt.hash(admin.password, 10),
        }))
      );

      const result = await collection.insertMany(hashedAdmins);
      console.log(`Inserted ${result.insertedCount} admin users.`);
    } catch (error) {
      console.error("Error inserting admin users:", error);
    } finally {
      await client.close();
    }
  }

  seedAdmins();
}
