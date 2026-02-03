
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: 'd:\\code\\laragon\\www\\parcelsystem\\backend\\.env' });

async function check() {
    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("parcelsystem");
        const parcels = db.collection("parcels");

        const userId = '697e57342c936799d08ec1c4'; // Hardcoded from user report

        console.log(`--- Querying for collectedBy: "${userId}" ---`);
        const results = await parcels.find({ collectedBy: userId }).toArray();
        console.log(`Found ${results.length} parcels.`);

        if (results.length === 0) {
            console.log("MATCH FAILED. Checking exact equality with manual iteration...");
            const all = await parcels.find({ status: 'Collected' }).toArray();
            all.forEach(p => {
                if (p.collectedBy == userId) {
                    console.log(`Manual Match found! ID: ${p._id}`);
                    console.log(`DB Value: '${p.collectedBy}'`);
                    console.log(`Search Val: '${userId}'`);
                    console.log(`Strict Eq: ${p.collectedBy === userId}`);
                }
            });
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

check();
