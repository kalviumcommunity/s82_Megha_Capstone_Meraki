const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// GET all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json({ volunteers });
  } catch (error) {
    console.error("❌ Error fetching Volunteers:", error.message);
    res.status(500).json({ error: "Failed to fetch Volunteers" });
  }
});

// POST a new volunteer
router.post('/', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const volunteer = await Volunteer.create({
      name,
      email,
      password,
      bio: age ? `Age: ${age}` : ''
    });
    res.status(201).json({ message: 'Volunteer added successfully!', volunteer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT (update) volunteer by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, age } = req.body;
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      { name, email, password, bio: age ? `Age: ${age}` : '' },
      { new: true }
    );
    res.json({ message: `Volunteer with ID ${id} updated successfully!`, updatedVolunteer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
