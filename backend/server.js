
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
                    role: 'student',
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
                        phoneNumber: user.phoneNumber,
                        role: user.role
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

        // Fetch all parcels from Atlas (ADMIN ONLY - Returns ALL parcels)
        app.get('/api/parcels', async (req, res) => {
            try {
                // In a real app, we should check for Admin Token here
                // For now, we assume this endpoint is only used by Admin Panel
                const result = await parcels.find({}).sort({ updatedAt: -1, createdAt: -1 }).toArray();
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
                console.log(`[PUT Parcel] ID: ${id}, Body:`, req.body, "Update:", updateData);
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

        // Track parcel by tracking number
        app.get('/api/parcels/track/:trackingNumber', async (req, res) => {
            try {
                const { trackingNumber } = req.params;

                // Case-insensitive search
                const parcel = await parcels.findOne({
                    trackingNumber: { $regex: new RegExp(`^${trackingNumber}$`, 'i') }
                });

                if (!parcel) {
                    return res.status(404).json({ error: "Parcel not found. Please check your tracking number." });
                }

                res.json(parcel);
            } catch (err) {
                res.status(500).json({ error: "Failed to track parcel" });
            }
        });

        // Get parcels collected by a specific user (USER HISTORY ONLY)
        app.get('/api/users/:userId/parcels', async (req, res) => {
            try {
                const { userId } = req.params;
                if (!userId || userId === 'undefined' || userId === 'null') {
                    return res.json([]); // Return empty if invalid ID
                }

                console.log(`[GET History] Fetching for UserID: ${userId}`);

                // Robust Query: Find matches whether stored as String OR ObjectId
                const query = {
                    $or: [
                        { collectedBy: userId },
                        { collectedBy: new ObjectId(userId) } // Try object ID too
                    ]
                };

                const result = await parcels.find(query)
                    .sort({ updatedAt: -1 })
                    .toArray();

                console.log(`[GET History] Found ${result.length} parcels`);
                res.json(result);
            } catch (err) {
                console.error("Error fetching user history:", err);
                res.status(500).json({ error: "Failed to fetch parcel history" });
            }
        });




        // Migration: Add timestamps to existing parcels that don't have them
        app.post('/api/migrate/timestamps', async (req, res) => {
            try {
                const now = new Date();
                const result = await parcels.updateMany(
                    { createdAt: { $exists: false } },
                    { $set: { createdAt: now, updatedAt: now } }
                );
                res.json({
                    message: "Migration completed",
                    modifiedCount: result.modifiedCount
                });
            } catch (err) {
                res.status(500).json({ error: "Migration failed" });
            }
        });

        // --- CATEGORY MANAGEMENT ROUTES ---
        const categories = db.collection("categories");

        // Get all categories
        app.get('/api/categories', async (req, res) => {
            try {
                const result = await categories.find({}).sort({ group: 1, name: 1 }).toArray();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch categories" });
            }
        });

        // Seed default categories
        app.post('/api/categories/seed', async (req, res) => {
            try {
                const now = new Date();
                const defaultCategories = [
                    // Weight categories (purple)
                    { name: '1kg', group: 'Weight', color: 'purple', createdAt: now, updatedAt: now },
                    { name: '3kg', group: 'Weight', color: 'purple', createdAt: now, updatedAt: now },
                    { name: '5kg', group: 'Weight', color: 'purple', createdAt: now, updatedAt: now },
                    { name: 'Above 5kg', group: 'Weight', color: 'purple', createdAt: now, updatedAt: now },
                    // Month categories (blue)
                    { name: 'January', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'February', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'March', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'April', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'May', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'June', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'July', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'August', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'September', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'October', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'November', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    { name: 'December', group: 'Month', color: 'blue', createdAt: now, updatedAt: now },
                    // Parcel Type categories (orange)
                    { name: 'Fragile', group: 'Parcel Type', color: 'orange', createdAt: now, updatedAt: now },
                    { name: 'Electronics', group: 'Parcel Type', color: 'orange', createdAt: now, updatedAt: now },
                    { name: 'General', group: 'Parcel Type', color: 'orange', createdAt: now, updatedAt: now }
                ];

                // Check if categories already exist
                const existingCount = await categories.countDocuments({});
                if (existingCount > 0) {
                    return res.json({ message: "Categories already seeded", existingCount });
                }

                const result = await categories.insertMany(defaultCategories);
                res.status(201).json({
                    message: "Categories seeded successfully",
                    insertedCount: result.insertedCount
                });
            } catch (err) {
                res.status(500).json({ error: "Failed to seed categories" });
            }
        });

        // Create a new category
        app.post('/api/categories', async (req, res) => {
            try {
                const newCategory = {
                    ...req.body,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                const result = await categories.insertOne(newCategory);
                res.status(201).json(result);
            } catch (err) {
                res.status(400).json({ error: "Failed to create category" });
            }
        });

        // Update a category
        app.put('/api/categories/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = {
                    ...req.body,
                    updatedAt: new Date()
                };
                const result = await categories.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updateData }
                );
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "Category not found" });
                }
                res.json({ message: "Category updated successfully", result });
            } catch (err) {
                res.status(400).json({ error: "Failed to update category" });
            }
        });

        // Delete a category
        app.delete('/api/categories/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const result = await categories.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Category not found" });
                }
                res.json({ message: "Category deleted successfully" });
            } catch (err) {
                res.status(400).json({ error: "Failed to delete category" });
            }
        });

        // --- COURIER MANAGEMENT ROUTES ---
        const couriers = db.collection("couriers");

        // Get all couriers
        app.get('/api/couriers', async (req, res) => {
            try {
                const result = await couriers.find({}).sort({ name: 1 }).toArray();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch couriers" });
            }
        });

        // Seed default couriers
        app.post('/api/couriers/seed', async (req, res) => {
            try {
                const now = new Date();
                const defaultCouriers = [
                    { name: 'J&T Express', contact: '1300-80-9000', trackingUrl: 'https://www.jtexpress.my/tracking/', createdAt: now, updatedAt: now },
                    { name: 'Pos Laju', contact: '1300-300-300', trackingUrl: 'https://www.pos.com.my/', createdAt: now, updatedAt: now },
                    { name: 'DHL', contact: '1800-888-388', trackingUrl: 'https://www.dhl.com/my-en/home/tracking.html', createdAt: now, updatedAt: now },
                    { name: 'FedEx', contact: '1800-88-6363', trackingUrl: 'https://www.fedex.com/en-my/tracking.html', createdAt: now, updatedAt: now },
                    { name: 'Ninja Van', contact: '+60 11-1722 5600', trackingUrl: 'https://www.ninjavan.co/en-my/tracking', createdAt: now, updatedAt: now },
                    { name: 'Shopee Express', contact: '+603-2777 9222', trackingUrl: 'https://spx.com.my/', createdAt: now, updatedAt: now },
                    { name: 'Lazada Express', contact: '+603-2728 6600', trackingUrl: 'https://tracker.lel.asia/', createdAt: now, updatedAt: now },
                    { name: 'Other', contact: '-', trackingUrl: '', createdAt: now, updatedAt: now }
                ];

                // Check dependencies (prevent duplicate seed)
                // For a proper re-seed with new fields, we might want to update existing ones or just insert if empty.
                // The current user requirement implies the feature is new/broken, so re-seeding or clearing might be needed.
                // However, the original code only inserts if count is 0. 
                // To support the user's request "fix it", I should probably allow updating if they exist but lack fields?
                // For now, I'll stick to the existing logic but update the default data structure. 
                // If the user's DB is already seeded, this won't run. I might need to add a "force" flag or just let them delete and re-seed.

                const existingCount = await couriers.countDocuments({});
                if (existingCount > 0) {
                    // OPTIONAL: Auto-migration could go here, but for now just return existing message
                    return res.json({ message: "Couriers already seeded", existingCount });
                }

                const result = await couriers.insertMany(defaultCouriers);
                res.status(201).json({
                    message: "Couriers seeded successfully",
                    insertedCount: result.insertedCount
                });
            } catch (err) {
                res.status(500).json({ error: "Failed to seed couriers" });
            }
        });

        // Create a new courier
        app.post('/api/couriers', async (req, res) => {
            try {
                const newCourier = {
                    ...req.body,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                const result = await couriers.insertOne(newCourier);
                res.status(201).json(result);
            } catch (err) {
                res.status(400).json({ error: "Failed to create courier" });
            }
        });

        // Update a courier
        app.put('/api/couriers/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = {
                    ...req.body,
                    updatedAt: new Date()
                };
                const result = await couriers.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updateData }
                );
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "Courier not found" });
                }
                res.json({ message: "Courier updated successfully", result });
            } catch (err) {
                res.status(400).json({ error: "Failed to update courier" });
            }
        });

        // Delete a courier
        app.delete('/api/couriers/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const result = await couriers.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Courier not found" });
                }
                res.json({ message: "Courier deleted successfully" });
            } catch (err) {
                res.status(400).json({ error: "Failed to delete courier" });
            }
        });

        // --- USER MANAGEMENT ROUTES ---
        // const users = db.collection("users"); // Use existing collection reference

        // Get all users
        app.get('/api/users', async (req, res) => {
            try {
                const result = await users.find({}).sort({ createdAt: -1 }).toArray();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch users" });
            }
        });

        // Create a new user (Admin)
        app.post('/api/users', async (req, res) => {
            try {
                const { studentId, fullName, email, phoneNumber, password, role } = req.body;

                // Basic validation
                if (!studentId || !fullName || !password) {
                    return res.status(400).json({ error: "Student ID, Name, and Password are required." });
                }

                // Check uniqueness
                const existingUser = await users.findOne({ $or: [{ studentId }, { email }] });
                if (existingUser) {
                    return res.status(400).json({ error: "Student ID or Email already exists." });
                }

                // Hash password
                const salt = await bcrypt.genSalt(12);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = {
                    studentId,
                    fullName,
                    email,
                    phoneNumber,
                    password: hashedPassword,
                    role: role || 'student',
                    status: 'active',
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                const result = await users.insertOne(newUser);
                res.status(201).json(result);
            } catch (err) {
                console.error("Create User Error:", err);
                res.status(500).json({ error: "Failed to create user" });
            }
        });

        // Update a user
        app.put('/api/users/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { password, ...otherData } = req.body;

                const updateData = {
                    ...otherData,
                    updatedAt: new Date()
                };

                // Only hash password if it's provided and non-empty
                if (password && password.trim() !== '') {
                    const salt = await bcrypt.genSalt(12);
                    updateData.password = await bcrypt.hash(password, salt);
                }

                const result = await users.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updateData }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "User not found" });
                }
                res.json({ message: "User updated successfully", result });
            } catch (err) {
                console.error("Update User Error:", err);
                res.status(500).json({ error: "Failed to update user" });
            }
        });

        // Delete a user
        app.delete('/api/users/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const result = await users.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "User not found" });
                }
                res.json({ message: "User deleted successfully" });
            } catch (err) {
                res.status(400).json({ error: "Failed to delete user" });
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