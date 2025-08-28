const express = require('express');
const router = express.Router();
const TopK = require('../models/TopK');

// Add a new Top-K item
router.post('/', async (req, res) => {
  try {
    const topk = new TopK(req.body);
    await topk.save();
    res.status(201).json(topk);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get top K items sorted by value descending
router.get('/', async (req, res) => {
  try {
    const k = parseInt(req.query.k) || 5; // default top 5
    const topItems = await TopK.find().sort({ value: -1 }).limit(k);
    res.json(topItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
