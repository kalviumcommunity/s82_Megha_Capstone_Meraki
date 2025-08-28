import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const router = express.Router();

// Initialize OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Zero-shot prompting route
router.post("/zeroshot", async (req, res) => {
  try {
    const { userInput } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",  // or "gpt-4" if available
      messages: [
        { role: "system", content: "You are an assistant for the Meraki NGO-Volunteer platform." },
        { role: "user", content: userInput }
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating response" });
  }
});

export default router;
