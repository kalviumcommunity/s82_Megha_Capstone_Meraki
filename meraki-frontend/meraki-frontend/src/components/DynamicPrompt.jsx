import React, { useState } from "react";
import { sendDynamicPrompt } from "../services/aiService";

export default function DynamicPrompt() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const response = await sendDynamicPrompt(prompt, 0.8, 0.7);
    setReply(response);
  };

  return (
    <div>
      <textarea
        placeholder="Type your prompt..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
      <div>
        <h3>AI Response:</h3>
        <p>{reply}</p>
      </div>
    </div>
  );
}
