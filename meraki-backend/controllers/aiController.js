const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.dynamicPrompt = async (req, res) => {
  try {
    const { userInput, top_p = 1.0, temperature = 0.7, max_tokens = 500 } = req.body;
    if (!userInput) return res.status(400).json({ error: "userInput is required" });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant for the Meraki NGO-Volunteer platform." },
        { role: "user", content: userInput }
      ],
      top_p,
      temperature,
      max_tokens
    });

    console.log("Prompt tokens:", response.usage.prompt_tokens);
    console.log("Completion tokens:", response.usage.completion_tokens);
    console.log("Total tokens:", response.usage.total_tokens);

    res.json({ reply: response.choices[0].message.content, tokens: response.usage });
  } catch (error) {
    console.error("❌ Error in dynamicPrompt:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
