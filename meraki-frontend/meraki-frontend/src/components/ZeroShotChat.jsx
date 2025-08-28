import React, { useState } from "react";

function ZeroShotChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await fetch("http://localhost:5000/api/zeroshot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Meraki Zero-Shot Assistant</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleAsk}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Ask
      </button>
      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default ZeroShotChat;
