
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Load environment variables
const uri = process.env.ATLAS_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Security check
if (!uri) {
    console.error("CRITICAL ERROR: ATLAS_URI is not defined in your .env file!");
    process.exit(1);
}

if (!JWT_SECRET) {
    console.error("CRITICAL ERROR: JWT_SECRET is not defined in your .env file!");
    process.exit(1);
}

const client = new MongoClient(uri);

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

// INITIATE THE CONNECTION
async function start() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        // SELECT DATABASE & COLLECTIONS
        const db = client.db("parcelsystem");
        const parcels = db.collection("parcels");
        const users = db.collection("users");

        // --- ROUTES ---

        // Home Route
        app.get('/', (req, res) => {
            res.send("<h1>Parcel System Backend</h1><p>Status: Running and Connected to Atlas.</p>");
        });

        // ==================== AUTH ROUTES ====================

        // REGISTER
        app.post('/api/auth/register', async (req, res) => {
            try {
                const { studentId, fullName, email, phoneNumber, password } = req.body;

                if (!studentId || !fullName || !email || !phoneNumber || !password) {
                    return res.status(400).json({ error: 'All fields are required.' });
                }

                if (password.length < 6) {
                    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({ error: 'Please enter a valid email address.' });
                }

                const existingUser = await users.findOne({ studentId });
                if (existingUser) {
                    return res.status(400).json({ error: 'Student ID is already registered.' });
                }

                // Check if email already exists
                const existingEmail = await users.findOne({ email });
                if (existingEmail) {
                    return res.status(400).json({ error: 'Email is already registered.' });
                }

                const salt = await bcrypt.genSalt(12);
                const hashedPassword = await bcrypt.hash(password, salt);

                const joinDate = new Date();
                const newUser = {
                    studentId,
                    fullName,
                    email,
                    phoneNumber,
                    password: hashedPassword,
                    createdAt: joinDate
                };

                const result = await users.insertOne(newUser);

                res.status(201).json({
                    message: 'Registration successful!',
                    userId: result.insertedId
                });

            } catch (err) {
                console.error('Register error:', err);
                res.status(500).json({ error: 'Registration failed. Please try again.' });
            }
        });

        // LOGIN
        app.post('/api/auth/login', async (req, res) => {
            try {
                const { studentId, password } = req.body;

                if (!studentId || !password) {
                    return res.status(400).json({ error: 'Student ID and password are required.' });
                }

                const user = await users.findOne({ studentId });
                if (!user) {
                    return res.status(401).json({ error: 'Invalid Student ID or password.' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Invalid Student ID or password.' });
                }

                const token = jwt.sign(
                    { userId: user._id, studentId: user.studentId },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.json({
                    message: 'Login successful!',
                    token,
                    user: {
                        id: user._id,
                        studentId: user.studentId,
                        fullName: user.fullName,
                        email: user.email,
                        phoneNumber: user.phoneNumber
                    }
                });

            } catch (err) {
                console.error('Login error:', err);
                res.status(500).json({ error: 'Login failed. Please try again.' });
            }
        });

        // GET CURRENT USER (Protected)
        app.get('/api/auth/me', verifyToken, async (req, res) => {
            try {
                const user = await users.findOne(
                    { _id: new ObjectId(req.user.userId) },
                    { projection: { password: 0 } }
                );

                if (!user) {
                    return res.status(404).json({ error: 'User not found.' });
                }

                res.json({
                    user: {
                        id: user._id,
                        studentId: user.studentId,
                        fullName: user.fullName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        createdAt: user.createdAt
                    }
                });

            } catch (err) {
                console.error('Get user error:', err);
                res.status(500).json({ error: 'Failed to fetch user data.' });
            }
        });

        // UPDATE PROFILE
        app.put('/api/auth/profile', verifyToken, async (req, res) => {
            try {
                const { fullName, currentPassword, newPassword } = req.body;
                const userId = req.user.userId;

                const user = await users.findOne({ _id: new ObjectId(userId) });
                if (!user) {
                    return res.status(404).json({ error: 'User not found.' });
                }

                const updateData = { fullName };

                if (newPassword) {
                    if (!currentPassword) {
                        return res.status(400).json({ error: 'Current password is required to set a new password.' });
                    }

                    const isMatch = await bcrypt.compare(currentPassword, user.password);
                    if (!isMatch) {
                        return res.status(401).json({ error: 'Incorrect current password.' });
                    }

                    if (newPassword.length < 6) {
                        return res.status(400).json({ error: 'New password must be at least 6 characters.' });
                    }

                    const salt = await bcrypt.genSalt(12);
                    updateData.password = await bcrypt.hash(newPassword, salt);
                }

                await users.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: updateData }
                );

                res.json({ message: 'Profile updated successfully' });

            } catch (err) {
                console.error('Update profile error:', err);
                res.status(500).json({ error: 'Failed to update profile.' });
            }
        });

        // ==================== PARCEL ROUTES ====================

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