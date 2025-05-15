require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const { User } = require('./models'); 

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON data
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};
connectDB();

// Sample GET endpoint for API data
app.get('/api/data', (req, res) => {
    res.json({ message: 'Welcome to Meraki API!', data: [] });
});

// GET endpoint for NGOs
app.get('/api/ngos', async (req, res) => {
    try {
        const ngos = await User.find({ type: 'ngo' }); // Assuming 'type' distinguishes NGOs
        res.json({ ngos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET endpoint for Volunteers
app.get('/api/volunteers', async (req, res) => {
    try {
        const volunteers = await User.find({ type: 'volunteer' });
        res.json({ volunteers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint for adding a new NGO
app.post('/api/ngos', async (req, res) => {
    try {
        const { name, description } = req.body;
        const ngo = await User.create({ name, description, type: 'ngo' });
        res.status(201).json({ message: 'NGO created successfully!', ngo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST endpoint for adding a new volunteer
app.post('/api/volunteers', async (req, res) => {
    try {
        const { name, age } = req.body;
        const volunteer = await User.create({ name, age, type: 'volunteer' });
        res.status(201).json({ message: 'Volunteer added successfully!', volunteer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT endpoint to update an NGO's details
app.put('/api/ngos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedNgo = await User.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        res.json({ message: `NGO with ID ${id} updated successfully!`, updatedNgo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT endpoint to update a volunteer's details
app.put('/api/volunteers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;
        const updatedVolunteer = await User.findByIdAndUpdate(
            id,
            { name, age },
            { new: true }
        );
        res.json({ message: `Volunteer with ID ${id} updated successfully!`, updatedVolunteer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
