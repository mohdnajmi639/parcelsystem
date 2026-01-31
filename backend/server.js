
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // Loads variables from your .env file

const app = express();

// MIDDLEWARE
app.use(cors()); // Allows React (port 3000) to talk to Node (port 5000)
app.use(express.json()); // Allows the server to accept JSON data in POST requests

// 2. LOAD THE URI
const uri = process.env.ATLAS_URI;

// Security check: Stop the server immediately if the .env is missing the URI
if (!uri) {
    console.error("CRITICAL ERROR: ATLAS_URI is not defined in your .env file!");
    process.exit(1);
}

const client = new MongoClient(uri);

// INITIATE THE CONNECTION (Async Function)
async function start() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        // SELECT DATABASE & COLLECTION
        const db = client.db("parcelsystem");
        const parcels = db.collection("parcels");

        // --- ROUTES ---

        // Home Route (Confirms the server is alive)
        app.get('/', (req, res) => {
            res.send("<h1>Parcel System Backend</h1><p>Status: Running and Connected to Atlas.</p>");
        });

        // Fetch all parcels from Atlas
        app.get('/api/parcels', async (req, res) => {
            try {
                const result = await parcels.find({}).toArray();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch parcels" });
            }
        });

        // Save a new parcel sent from React
        app.post('/api/parcels', async (req, res) => {
            try {
                const newParcel = req.body; // The data sent from your frontend form
                const result = await parcels.insertOne(newParcel);
                res.status(201).json(result);
            } catch (err) {
                res.status(400).json({ error: "Failed to save parcel data" });
            }
        });

        // START SERVER
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on: http://localhost:${PORT}`);
        });

    } catch (e) {
        // Log connection errors (like wrong password in .env)
        console.error("MongoDB Connection Error:", e);
    }
}

// RUN THE START FUNCTION
start();