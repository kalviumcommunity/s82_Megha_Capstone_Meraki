import React, { useState } from "react";

export default function ChatBox({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user msg
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("http://localhost:5000/api/ai/dynamicprompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userInput: input,
          history: newMessages,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      }
    } catch (error) {
      console.error(error);
    }

    setInput("");
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="h-64 overflow-y-auto mb-4 p-2 bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-2 py-1 rounded-lg ${msg.role === "user" ? "bg-blue-200" : "bg-green-200"}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow border p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}
