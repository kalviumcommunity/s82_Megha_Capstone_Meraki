const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Sample GET endpoint for API data
app.get('/api/data', (req, res) => {
    res.json({ message: 'Welcome to Meraki API!', data: [] });
});

// GET endpoint for NGOs
app.get('/api/ngos', (req, res) => {
    res.json({ ngos: ['NGO1', 'NGO2', 'NGO3'] });
});

// GET endpoint for Volunteers
app.get('/api/volunteers', (req, res) => {
    res.json({ volunteers: ['Volunteer1', 'Volunteer2', 'Volunteer3'] });
});

// POST endpoint for adding a new NGO
app.post('/api/ngos', (req, res) => {
    const { name, description } = req.body;
    // Here, you'd typically save this to a database
    res.status(201).json({ message: 'NGO created successfully!', ngo: { name, description } });
});

// POST endpoint for adding a new volunteer
app.post('/api/volunteers', (req, res) => {
    const { name, age } = req.body;
    // Here, you'd typically save this to a database
    res.status(201).json({ message: 'Volunteer added successfully!', volunteer: { name, age } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
