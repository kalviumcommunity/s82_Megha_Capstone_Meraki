require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI = require('openai');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
connectDB();

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔹 Test route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Welcome to Meraki API!', data: [] });
});

// 🔹 GET NGOs
app.get('/api/ngos', async (req, res) => {
  try {
    const ngos = await User.find({ role: 'ngo' });
    res.json({ ngos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 GET Volunteers
app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer' });
    res.json({ volunteers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 POST NGO
app.post('/api/ngos', async (req, res) => {
  try {
    const { name, email, password, description } = req.body;
    const ngo = await User.create({
      name,
      email,
      password,
      role: 'ngo',
      bio: description,
    });
    res.status(201).json({ message: 'NGO created successfully!', ngo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 POST Volunteer
app.post('/api/volunteers', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const volunteer = await User.create({
      name,
      email,
      password,
      role: 'volunteer',
      bio: age ? `Age: ${age}` : '',
    });
    res.status(201).json({ message: 'Volunteer added successfully!', volunteer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Zero-shot prompting route
app.post('/api/zeroshot', async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: "userInput is required" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant for the Meraki NGO-Volunteer platform." },
        { role: "user", content: userInput }
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error in /api/zeroshot:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
