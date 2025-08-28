// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const OpenAI = require('openai');

// Models
const NGO = require('./models/NGO');
const Volunteer = require('./models/Volunteer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔹 Test route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Welcome to the Meraki API!' });
});

// 🔹 NGOs route
app.get('/api/ngos', async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json({ ngos });
  } catch (error) {
    console.error("❌ Error fetching NGOs:", error.message);
    res.status(500).json({ error: "Failed to fetch NGOs" });
  }
});

// 🔹 Volunteers route
app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json({ volunteers });
  } catch (error) {
    console.error("❌ Error fetching Volunteers:", error.message);
    res.status(500).json({ error: "Failed to fetch Volunteers" });
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

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
