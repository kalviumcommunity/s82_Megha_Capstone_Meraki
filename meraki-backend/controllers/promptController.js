import { encode } from "gpt-tokenizer";  // for token counting

// Example controller for dynamic prompting
export const handlePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Count tokens
    const tokenized = encode(prompt);
    const tokenCount = tokenized.length;

    // ✅ Log the token count to console (evaluation requirement)
    console.log(`Prompt: "${prompt}"`);
    console.log(`Token Count: ${tokenCount}`);

    // Example response (in real case, send prompt to OpenAI API)
    return res.json({
      message: "Prompt processed successfully",
      tokens_used: tokenCount,
    });
  } catch (error) {
    console.error("Error in handlePrompt:", error);
    res.status(500).json({ error: "Server error" });
  }
};
