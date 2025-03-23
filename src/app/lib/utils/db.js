const mongoose = require('mongoose');

const uri = "mongodb+srv://obobadams:kRLl42M3BzSIXlvl@cluster0.mtf9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection ✅");
        return;
    }

    try {
        const db = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to MongoDB Atlas ✅");
    } catch (error) {
        console.error("MongoDB connection error ❌:", error);
        throw new Error("Database connection failed");
    }
};

module.exports = connectDB;
