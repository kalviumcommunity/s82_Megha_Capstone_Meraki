const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/data', (req, res) => {
    res.json({ message: 'Welcome to the Meraki API!' });
});

app.get('/api/ngos', (req, res) => {
    res.json({ ngos: ['NGO1', 'NGO2', 'NGO3'] });
});

app.get('/api/volunteers', (req, res) => {
    res.json({ volunteers: ['Volunteer1', 'Volunteer2', 'Volunteer3'] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
