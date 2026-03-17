require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const opportunityRoutes = require('./src/routes/opportunityRoutes');
const communityRoutes = require('./src/routes/communityRoutes');
const trainingRoutes = require('./src/routes/trainingRoutes');
const donationRoutes = require('./src/routes/donationRoutes');

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// DB Status & API Interceptor Middleware
app.use((req, res, next) => {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1 && req.path.startsWith('/api/')) {
        console.warn(`[DB Offline] Intercepted request to ${req.path}`);
        // Allow certain GET routes to fail gracefully if needed, or block them
        if (req.method !== 'GET') {
            return res.status(503).json({
                error: "Service Temporarily Unavailable",
                message: "Database connection is offline. Please try again later or check server logs."
            });
        }
    }
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/hub', trainingRoutes);
app.use('/api/donations', donationRoutes);

// General API info
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Meraki API",
        version: "1.0.0",
        endpoints: [
            "/api/users",
            "/api/opportunities",
            "/api/community",
            "/api/hub/events",
            "/api/hub/courses",
            "/api/donations"
        ]
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access API at http://localhost:${PORT}`);
});
