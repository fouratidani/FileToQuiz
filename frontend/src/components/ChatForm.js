import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newHistory = [
      ...chatHistory,
      { role: "user", text: message },
      { role: "model", text: "Thinking..." },
    ];
    setChatHistory(newHistory);
    setMessage("");
    generateBotResponse(newHistory);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 rounded-full border-none outline-none shadow-inner text-gray-600"
      />
      <button
        type="submit"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-md transition-all hover:from-teal-700 hover:to-teal-900 hover:scale-110"
      >
        <IoSend className="text-lg" />
      </button>
    </form>
  );
};

export default ChatForm;