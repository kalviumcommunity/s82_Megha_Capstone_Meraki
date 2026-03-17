require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
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

app.use('/api/users', userRoutes);

// Placeholder Routes for other modules
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Meraki API", version: "1.0.0" });
});

// Opportunities Routes (Placeholder)
app.get('/api/opportunities', (req, res) => {
    res.json({ opportunities: [], message: "Opportunities endpoint placeholder" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access API at http://localhost:${PORT}`);
});
