const express = require('express');
const router = express.Router();
const Temperature = require('../models/Temperature');

// Add a new temperature reading
router.post('/', async (req, res) => {
  try {
    const temp = new Temperature(req.body);
    await temp.save();
    res.status(201).json(temp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all temperature readings
router.get('/', async (req, res) => {
  try {
    const temps = await Temperature.find().sort({ recordedAt: -1 });
    res.json(temps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
