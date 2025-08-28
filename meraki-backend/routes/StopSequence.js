const express = require('express');
const router = express.Router();
const StopSequence = require('../models/StopSequence');

// Add a new stop sequence
router.post('/', async (req, res) => {
  try {
    const stop = new StopSequence(req.body);
    await stop.save();
    res.status(201).json(stop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all stop sequences sorted by order
router.get('/', async (req, res) => {
  try {
    const stops = await StopSequence.find().sort({ order: 1 });
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
