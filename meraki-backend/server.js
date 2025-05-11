const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const ngoRoutes = require('./routes/ngos');
const volunteerRoutes = require('./routes/volunteers');
const opportunityRoutes = require('./routes/opportunities');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/ngos', ngoRoutes); // NGO routes
app.use('/api/volunteers', volunteerRoutes); // Volunteer routes
app.use('/api/opportunities', opportunityRoutes); // Opportunity routes

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'Meraki backend is running!' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
