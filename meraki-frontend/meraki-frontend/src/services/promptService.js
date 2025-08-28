import axios from "axios";

export const sendPrompt = async (prompt) => {
  try {
    const res = await axios.post("http://localhost:5000/api/prompt", { prompt });
    console.log("✅ Tokens used:", res.data.tokens_used);  // show in browser console
    return res.data;
  } catch (err) {
    console.error("Error sending prompt:", err);
  }
};
