import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaLightbulb, FaQuestionCircle, FaFileUpload } from "react-icons/fa";
import { useDarkMode } from "../context/darkMode";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const chatBodyRef = useRef();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  // Quiz-specific quick questions
  const quickQuestions = [
    "How do I create a quiz from a file?",
    "What types of files can I upload?",
    "Can I customize the generated quiz?",
    "How do I share my quiz with students?"
  ];

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    // Check for specific commands
    const lastMessage = history[history.length - 2]?.text.toLowerCase();
    if (lastMessage?.includes("create quiz") || lastMessage?.includes("make quiz")) {
      navigate("/pdfDisplay");
      updateHistory("Taking you to the quiz creator now! Upload your file to get started.");
      return;
    }

    if (lastMessage?.includes("upload")) {
      navigate("/pdfDisplay");
      updateHistory("Redirecting you to the file upload page...");
      return;
    }

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=ADD_YOUR_KEY_HERE",
        requestOption
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went WRONG!!");
      
      let apiResponseText = data.candidates[0]?.content?.parts?.[0]?.text?.replace(
        /\*\*(.*?)\*\*/g,
        "$1"
      ).trim() || "I didn't understand that.";

      // Enhance responses with quiz-specific formatting
      if (apiResponseText.includes("quiz") || apiResponseText.includes("question")) {
        apiResponseText = apiResponseText
        .replace(/(\d+\.|-) \s/g, "\n$1 ")
        .replace(/Question:/g, "\nQuestion:")
        .replace(/Answer:/g, "\nAnswer:");
      }
      // Add File2Quiz branding to some responses
      if (apiResponseText.includes("file") || apiResponseText.includes("upload")) {
        apiResponseText += "\n\nYou can upload your files directly in the File2Quiz dashboard!";
      }

      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Error fetching response:", error);
      updateHistory("Oops! Something went wrong. Please try again.");
    }
  };

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

  const handleQuickQuestion = (question) => {
    const newHistory = [
      ...chatHistory,
      { role: "user", text: question },
      { role: "model", text: "Thinking..." },
    ];
    setChatHistory(newHistory);
    generateBotResponse(newHistory);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      <motion.button
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
          darkMode
            ? "bg-gradient-to-br from-green-600 to-green-800 text-white"
            : "bg-gradient-to-br from-green-400 to-green-600 text-white"
        }`}
        onClick={() => setShowChat(!showChat)}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaRobot className="text-xl" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      {showChat && (
        <motion.div
          className={`w-96 rounded-xl shadow-xl overflow-hidden border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Header */}
          <div
            className={`flex justify-between items-center p-4 ${
              darkMode
                ? "bg-gradient-to-r from-gray-800 to-gray-700"
                : "bg-gradient-to-r from-gray-100 to-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  darkMode ? "bg-green-600" : "bg-green-500"
                } text-white`}
              >
                <FaRobot className="text-lg" />
              </div>
              <div>
                <h3
                  className={`font-bold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Quizzy - Your File2Quiz Assistant
                </h3>
                <p
                  className={`text-xs ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Transforming files into quizzes in seconds!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className={`p-2 rounded-full ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } transition-colors`}
            >
              <FaTimes
                className={darkMode ? "text-gray-300" : "text-gray-600"}
              />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatBodyRef}
            className={`h-80 p-4 overflow-y-auto flex flex-col gap-3 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div
                className={`p-3 rounded-lg rounded-tl-none ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } shadow-sm`}
              >
                <p className="font-medium">Welcome to File2Quiz! I'm Quizzy, here to help you:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Convert files into interactive quizzes</li>
                  <li>Explain the quiz creation process</li>
                  <li>Suggest effective question formats</li>
                  <li>Help with sharing and managing quizzes</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-500/20">
                  <p className="text-sm font-medium">
                    Try asking me about:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {quickQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className={`text-xs px-3 py-1 rounded-full ${
                          darkMode
                            ? "bg-gray-600 hover:bg-gray-500 text-green-300"
                            : "bg-gray-200 hover:bg-gray-300 text-green-600"
                        } transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] ${
                    chat.role === "user"
                      ? darkMode
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-green-500 text-white rounded-br-none"
                      : darkMode
                      ? "bg-gray-700 text-gray-200 rounded-tl-none"
                      : "bg-gray-100 text-gray-700 rounded-tl-none"
                  } shadow-sm whitespace-pre-wrap`}
                >
                  {chat.text === "Thinking..." ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FaLightbulb
                          className={darkMode ? "text-green-400" : "text-green-600"}
                        />
                      </motion.div>
                      <span>Creating quiz magic...</span>
                    </div>
                  ) : (
                    <p>{chat.text}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className={`p-3 border-t ${
              darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about File2Quiz features..."
                className={`w-full pl-4 pr-12 py-3 rounded-full focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-green-500"
                    : "bg-white text-gray-800 placeholder-gray-500 focus:ring-green-400"
                } shadow-sm`}
              />
              <motion.button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                  darkMode ? "bg-green-600" : "bg-green-500"
                } text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!message.trim()}
              >
                <FaPaperPlane />
              </motion.button>
            </div>
            <div className="mt-2 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/pdfDisplay")}
                className={`text-xs flex items-center gap-1 px-3 py-1 rounded-full ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-green-400"
                    : "bg-gray-200 hover:bg-gray-300 text-green-600"
                } transition-colors`}
              >
                <FaFileUpload className="text-xs" />
                <span>Upload Files</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/pdfDisplay")}
                className={`text-xs flex items-center gap-1 px-3 py-1 rounded-full ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-green-400"
                    : "bg-gray-200 hover:bg-gray-300 text-green-600"
                } transition-colors`}
              >
                <FaQuestionCircle className="text-xs" />
                <span>Create Quiz</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;