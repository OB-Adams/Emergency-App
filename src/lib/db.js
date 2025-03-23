const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://obobadams:kRLl42M3BzSIXlvl@cluster0.mtf9a.mongodb.net/exercise-tracker?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        return client.db("<dbname>");
    } catch (error) {
        console.error("Connection failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;
