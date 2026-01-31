
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './backend/.env' });

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

async function checkUsers() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("parcelsystem");
        const users = db.collection("users");

        const allUsers = await users.find({}).toArray();
        console.log("Total Users:", allUsers.length);

        allUsers.forEach(user => {
            console.log(`ID: ${user._id}, StudentID: ${user.studentId}, Name: ${user.fullName}, Email: ${user.email}, Phone: ${user.phoneNumber}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkUsers();
