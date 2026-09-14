const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        if (uri) {
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return;
        }

        // Try local MongoDB default URI
        try {
            const localUri = 'mongodb://127.0.0.1:27017/meraki';
            const conn = await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
            console.log(`MongoDB Connected (Local): ${conn.connection.host}`);
            return;
        } catch (localErr) {
            console.log('ℹ️ Local MongoDB instance not detected. Initializing In-Memory Database Server...');
        }

        // Fallback to In-Memory MongoDB Server for Zero-Config Development
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const memoryUri = mongod.getUri();

        const conn = await mongoose.connect(memoryUri);
        console.log(`✅ MongoDB Connected (In-Memory Database Server): ${conn.connection.host}`);

        // Auto-seed initial demo data in memory mode
        const seedData = require('../utils/seeder');
        await seedData();

    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            console.warn('⚠️ Server running without database persistence.');
        }
    }
};

module.exports = connectDB;
