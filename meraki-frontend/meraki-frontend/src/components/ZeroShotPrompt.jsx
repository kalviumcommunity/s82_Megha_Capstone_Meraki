import React, { useState } from "react";
import axios from "axios";

const ZeroShotPrompt = () => {
  const [userInput, setUserInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
      const response = await axios.post("http://localhost:5000/api/ai/zeroshot", { userInput });
      setReply(response.data.reply);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Zero-Shot Prompt</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          rows={4}
          placeholder="Type your question or prompt here..."
          className="w-full border border-gray-300 rounded-md p-2 mb-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {reply && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <strong>AI Response:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default ZeroShotPrompt;
