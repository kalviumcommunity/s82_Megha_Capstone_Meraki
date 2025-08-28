require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI = require('openai');

// Routes
const topkRoutes = require('./routes/topk');
const structuredOutputRoutes = require('../routes/structuredOutput');
const stopSequenceRoutes = require('../routes/stopSequence');

// Models
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// 🔹 API Routes
app.use('/api/topk', topkRoutes);
app.use('/api/structured-output', structuredOutputRoutes);
app.use('/api/stop-sequence', stopSequenceRoutes);

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
