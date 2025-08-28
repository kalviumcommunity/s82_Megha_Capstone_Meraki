const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Routes
app.get('/api/data', (req, res) => {
    res.json({ message: 'Welcome to the Meraki API!' });
});

app.get('/api/ngos', (req, res) => {
    res.json({ ngos: ['NGO1', 'NGO2', 'NGO3'] });
});

app.get('/api/volunteers', (req, res) => {
    res.json({ volunteers: ['Volunteer1', 'Volunteer2', 'Volunteer3'] });
});

// ✅ Zero-shot prompting route
app.post('/api/zeroshot', async (req, res) => {
    try {
        const { userInput } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", // or gpt-4 / gpt-3.5 if enabled
            messages: [
                { role: "system", content: "You are a helpful assistant for the Meraki NGO-Volunteer platform." },
                { role: "user", content: userInput }
            ],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
