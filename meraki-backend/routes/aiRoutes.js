const express = require('express');
const OpenAI = require('openai');
const { buildSystemPrompt } = require('../helpers/contextBuilder');

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Dynamic Prompting
router.post('/dynamicprompt', async (req, res) => {
  try {
    const { userId, userInput, history, context } = req.body;
    if (!userId || !userInput) return res.status(400).json({ error: 'userId and userInput required' });

    // Build system prompt from DB
    const systemPrompt = await buildSystemPrompt(userId, context);

    // Build messages
    const messages = [{ role: 'system', content: systemPrompt }];
    if (Array.isArray(history)) messages.push(...history.slice(-10)); // last 10 msgs
    messages.push({ role: 'user', content: userInput });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

module.exports = router;
