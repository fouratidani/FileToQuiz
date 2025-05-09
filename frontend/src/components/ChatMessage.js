import React from "react";
import ChatBotIcon from "./ChatBotIcon";

const ChatMessage = ({ chat }) => {
  return (
    <div
      className={`flex items-start gap-2 max-w-[80%] ${
        chat.role === "user" ? "ml-auto" : ""
      }`}
    >
      {chat.role === "model" && (
        <div className="flex-shrink-0">
          <ChatBotIcon />
        </div>
      )}
      <div
        className={`px-4 py-2 rounded-2xl shadow-sm ${
          chat.role === "user"
            ? "bg-teal-700 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        }`}
      >
        <p className="text-sm">{chat.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;