import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import aiAvatar from "../pictures/avatar-image.png";

const textLines = [
  "👋 Oh hey there, human!",
  "I'm Quizy, your friendly AI quiz master! 🤖",
  "I turn boring files into exciting quizzes. ✨",
  "Wanna give it a try? It's easy!",
  "Just hit ", 
  "Or tap ", 
];

const hackingSpeed = 50; // Speed for letters appearing

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Open popup when component mounts

    let currentText = "";
    let index = 0;

    const interval = setInterval(() => {
      if (index < textLines[lineIndex].length) {
        currentText += textLines[lineIndex][index];
        setDisplayText(currentText);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (lineIndex === 4) setShowSignUp(true); // Show Sign Up Button when it's time
          if (lineIndex === 5) setShowLogin(true); // Show Login Button when it's time
          if (lineIndex < textLines.length - 1) {
            setLineIndex(lineIndex + 1);
            setDisplayText(""); // Reset for the next line
          }
        }, 1000); // Delay before next line
      }
    }, hackingSpeed);

    return () => clearInterval(interval);
  }, [lineIndex]); // Re-run effect when lineIndex updates

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="w-full max-w-4xl h-3/4 rounded-2xl shadow-xl flex overflow-hidden">
          {/* Left Section - Avatar Full Side */}
          <motion.div
            className="w-1/2 flex items-center justify-center bg-gray-900"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img
              src={aiAvatar}
              alt="Quizy AI Avatar"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Section - Content */}
          <motion.div
            className="w-1/2 flex flex-col justify-center items-start p-10 bg-white"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-green-500">File2Quiz!</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 font-mono min-h-[96px]">
              {displayText} 
              {showSignUp && (
                <motion.button
                  onClick={() => console.log("Sign Up Clicked")}
                  className="bg-green-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-green-600 transition shadow-lg inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              )}
              {lineIndex >= 5 && " to start your first quiz..."}  
            </p>
            <p className="text-lg text-gray-600 mb-6 font-mono min-h-[96px]">
              {lineIndex >= 5 ? textLines[5] : ""}
              {showLogin && (
                <motion.button
                  onClick={() => console.log("Login Clicked")}
                  className="bg-gray-700 text-white px-4 py-2 ml-2 rounded-lg hover:bg-gray-800 transition shadow-lg inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              )}
              {lineIndex >= 5 && " if we're already quiz buddies! 😎"}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  );
};

export default Popup;
