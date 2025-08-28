import axios from "axios";

const API_BASE = "http://localhost:5000/api/ai";

export const sendDynamicPrompt = async (prompt, top_p = 1.0, temperature = 0.7) => {
  try {
    const res = await axios.post(`${API_BASE}/dynamic-prompt`, { userInput: prompt, top_p, temperature });
    console.log("Tokens used:", res.data.tokens?.total_tokens);
    return res.data.reply;
  } catch (err) {
    console.error("Error sending dynamic prompt:", err);
    return "Failed to fetch AI response";
  }
};
