const express = require('express');
const router = express.Router();
const Embedding = require('../models/Embedding');

// Add a new embedding
router.post('/', async (req, res) => {
  try {
    const embedding = new Embedding(req.body);
    await embedding.save();
    res.status(201).json(embedding);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all embeddings
router.get('/', async (req, res) => {
  try {
    const embeddings = await Embedding.find().sort({ createdAt: -1 });
    res.json(embeddings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
