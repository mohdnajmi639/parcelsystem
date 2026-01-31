
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
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
                const result = await parcels.find({}).sort({ createdAt: -1 }).toArray();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch parcels" });
            }
        });

        // Save a new parcel sent from React
        app.post('/api/parcels', async (req, res) => {
            try {
                const newParcel = {
                    ...req.body,
                    status: req.body.status || 'Received',
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                const result = await parcels.insertOne(newParcel);
                res.status(201).json(result);
            } catch (err) {
                res.status(400).json({ error: "Failed to save parcel data" });
            }
        });

        // Update a parcel (e.g., change status from Received to Collected)
        app.put('/api/parcels/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = {
                    ...req.body,
                    updatedAt: new Date()
                };
                const result = await parcels.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updateData }
                );
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "Parcel not found" });
                }
                res.json({ message: "Parcel updated successfully", result });
            } catch (err) {
                res.status(400).json({ error: "Failed to update parcel" });
            }
        });

        // Delete a parcel by ID
        app.delete('/api/parcels/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const result = await parcels.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Parcel not found" });
                }
                res.json({ message: "Parcel deleted successfully" });
            } catch (err) {
                res.status(400).json({ error: "Failed to delete parcel" });
            }
        });

        // Get dashboard stats (parcels today, pending, overdue)
        app.get('/api/stats', async (req, res) => {
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                sevenDaysAgo.setHours(0, 0, 0, 0);

                // Parcels received today
                const parcelsToday = await parcels.countDocuments({
                    createdAt: { $gte: today }
                });

                // Pending collection (status = Received)
                const pendingCollection = await parcels.countDocuments({
                    status: 'Received'
                });

                // Overdue: Received more than 7 days ago and still not collected
                const overdue = await parcels.countDocuments({
                    status: 'Received',
                    createdAt: { $lt: sevenDaysAgo }
                });

                // Total parcels
                const totalParcels = await parcels.countDocuments({});

                res.json({
                    parcelsToday,
                    pendingCollection,
                    overdue,
                    totalParcels
                });
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch stats" });
            }
        });

        // Get recent parcels (last 5)
        app.get('/api/parcels/recent', async (req, res) => {
            try {
                const result = await parcels.find({})
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .toArray();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch recent parcels" });
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