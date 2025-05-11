const express = require('express');
const router = express.Router();

// Mock data (replace with your database queries later)
const ngos = [
    { id: 1, name: 'Helping Hands', location: 'New York' },
    { id: 2, name: 'Green Earth', location: 'San Francisco' },
];

// GET all NGOs
router.get('/', (req, res) => {
    res.json(ngos);
});

// GET NGO by ID
router.get('/:id', (req, res) => {
    const ngo = ngos.find(n => n.id === parseInt(req.params.id));
    if (!ngo) return res.status(404).json({ message: 'NGO not found' });
    res.json(ngo);
});

module.exports = router;
