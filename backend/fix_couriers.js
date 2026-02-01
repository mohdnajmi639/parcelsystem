const http = require('http');

const API_URL = 'http://localhost:5000/api';

// Helper to make requests
const request = (path, method) => {
    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body || '{}')));
        });
        req.on('error', reject);
        req.end();
    });
};

const main = async () => {
    console.log('Fetching existing couriers...');
    const couriers = await request('/api/couriers', 'GET');

    console.log(`Found ${couriers.length} couriers. Deleting...`);
    for (const c of couriers) {
        await request(`/api/couriers/${c._id}`, 'DELETE');
    }

    console.log('Seeding default couriers...');
    const seedResult = await request('/api/couriers/seed', 'POST');
    console.log('Seed result:', seedResult);
};

main().catch(console.error);
