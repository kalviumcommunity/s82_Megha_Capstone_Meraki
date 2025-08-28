const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO');

// GET all NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json({ ngos });
  } catch (error) {
    console.error("❌ Error fetching NGOs:", error.message);
    res.status(500).json({ error: "Failed to fetch NGOs" });
  }
});

// POST a new NGO
router.post('/', async (req, res) => {
  try {
    const { name, email, password, description } = req.body;
    const ngo = await NGO.create({
      name,
      email,
      password,
      bio: description
    });
    res.status(201).json({ message: 'NGO created successfully!', ngo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT (update) NGO by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, description } = req.body;
    const updatedNgo = await NGO.findByIdAndUpdate(
      id,
      { name, email, password, bio: description },
      { new: true }
    );
    res.json({ message: `NGO with ID ${id} updated successfully!`, updatedNgo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
