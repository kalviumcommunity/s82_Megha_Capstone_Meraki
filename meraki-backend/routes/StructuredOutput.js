const express = require('express');
const router = express.Router();
const StructuredOutput = require('../models/StructuredOutput');

// Add a new structured output
router.post('/', async (req, res) => {
  try {
    const output = new StructuredOutput(req.body);
    await output.save();
    res.status(201).json(output);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all structured outputs
router.get('/', async (req, res) => {
  try {
    const outputs = await StructuredOutput.find().sort({ createdAt: -1 });
    res.json(outputs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
