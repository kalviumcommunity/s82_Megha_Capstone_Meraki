const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = "your_jwt_secret_key"; // Replace with an environment variable

// Signup
router.post(
  '/signup',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be 6+ characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// Dashboard (Protected Route)
router.get('/dashboard', async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(verified.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

module.exports = router;
