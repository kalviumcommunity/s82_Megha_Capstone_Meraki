import React from "react";
import ChatBox from "../components/ChatBox";

export default function AiAssistant() {
  const dummyUserId = "64f3a1c4b2f3a2c1a2b3c4d5"; // Replace with logged-in user's ID from auth

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ChatBox userId={dummyUserId} />
    </div>
  );
}
