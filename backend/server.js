const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Placeholder Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Meraki API", version: "1.0.0" });
});

// Auth Routes (Sign In / Sign Up)
app.post('/api/auth/register', (req, res) => {
    res.status(201).json({ message: "Registration endpoint placeholder" });
});

app.post('/api/auth/login', (req, res) => {
    res.status(200).json({ message: "Login endpoint placeholder" });
});

// Opportunities Routes
app.get('/api/opportunities', (req, res) => {
    res.json({ opportunities: [], message: "Opportunities endpoint placeholder" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access API at http://localhost:${PORT}`);
});
