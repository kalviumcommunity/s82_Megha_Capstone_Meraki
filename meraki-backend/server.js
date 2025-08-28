require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes from structured-output-feature branch
app.use('/api/topk', require('./routes/topk'));
app.use('/api/structured-output', require('./routes/structuredOutput'));

// Models
const { User } = require('./models');

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
