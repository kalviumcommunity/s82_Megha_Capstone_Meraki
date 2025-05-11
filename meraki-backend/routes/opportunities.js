const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');

// GET all Opportunities
router.get('/', async (req, res) => {
    try {
        const opportunities = await Opportunity.find();
        res.json(opportunities);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch opportunities' });
    }
});

// GET a specific Opportunity by ID
router.get('/:id', async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return res.status(404).json({ error: 'Opportunity not found' });
        res.json(opportunity);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch opportunity' });
    }
});

module.exports = router;
