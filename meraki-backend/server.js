const express = require('express');
const app = express();
const PORT = 5000;

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
