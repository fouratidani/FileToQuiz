import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../pictures/logo192.png";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/darkMode";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  // Check for user token in local storage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <motion.nav
      className={`flex items-center justify-between px-6 py-3 shadow-md z-50 relative ${
        darkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
          : "bg-gradient-to-r from-gray-100 via-white to-gray-100"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center space-x-6">
        <motion.img
          src={logo}
          alt="Logo"
          className="w-20 h-20 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/")}
        />
        <div className={`flex space-x-4 font-medium ${darkMode ? "text-gray-200" : "text-black"}`}>
          <motion.button
            className={`px-4 py-2 rounded-lg transition ${
              darkMode ? "hover:bg-green-600 hover:text-white" : "hover:bg-green-500 hover:text-white"
            }`}
            onClick={() => {
              navigate("/");
              setShowDropdown(false);
            }}
            whileHover={{ scale: 1.1 }}
          >
            Upload File
          </motion.button>

          <motion.button
            className={`px-4 py-2 rounded-lg transition ${
              darkMode ? "hover:bg-green-600 hover:text-white" : "hover:bg-green-500 hover:text-white"
            }`}
            onClick={() => {
              navigate("/pdfDisplay"); // Fixed typo in route name
              setShowDropdown(false);
            }}
            whileHover={{ scale: 1.1 }}
          >
            Choose File
          </motion.button>

          <motion.button
            className={`px-4 py-2 rounded-lg transition ${
              darkMode ? "hover:bg-green-600 hover:text-white" : "hover:bg-green-500 hover:text-white"
            }`}
            onClick={() => {
              navigate("/quiz");
              setShowDropdown(false);
            }}
            whileHover={{ scale: 1.1 }}
          >
            Generate Quiz
          </motion.button>
        </div>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className={`border rounded-full px-4 py-1 focus:outline-none focus:ring-2 transition w-48 ${
            darkMode
              ? "bg-gray-700 border-gray-600 focus:ring-green-500 text-white placeholder-gray-400"
              : "focus:ring-green-500"
          }`}
        />
        <FaSearch className={`absolute right-3 top-2 cursor-pointer transition ${
          darkMode ? "text-gray-400 hover:text-green-400" : "text-gray-500 hover:text-green-500"
        }`} />
      </div>

      {/* Right Section: Links and Buttons */}
      <div className="flex items-center space-x-6">
        <div className={`flex space-x-4 font-medium ${
          darkMode ? "text-gray-200" : "text-black"
        }`}>
          {["Support", "About", "Contact"].map((link, index) => (
            <motion.button
              key={index}
              className={`cursor-pointer transition ${
                darkMode ? "hover:text-green-400" : "hover:text-green-600"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {link}
            </motion.button>
          ))}
        </div>

        {/* Authentication Buttons */}
        {user ? (
          <div className="relative z-50">
            <motion.button
              className={`flex items-center space-x-2 px-4 py-1 rounded-full border transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
              whileHover={{ scale: 1.05 }}
            >
              <FaUserCircle className="text-xl" />
              <span>{user.name || user.email}</span>
            </motion.button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <motion.div
                className={`absolute right-0 mt-2 shadow-lg rounded-md w-48 z-50 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={`block w-full px-4 py-2 text-left transition ${
                    darkMode
                      ? "hover:bg-green-600 hover:text-white"
                      : "hover:bg-green-500 hover:text-white"
                  }`}
                  onClick={() => {
                    navigate("/profile");
                    setShowDropdown(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className={`block w-full px-4 py-2 text-left transition ${
                    darkMode
                      ? "hover:bg-green-600 hover:text-white"
                      : "hover:bg-green-500 hover:text-white"
                  }`}
                  onClick={() => {
                    navigate("/leaderboard");
                    setShowDropdown(false);
                  }}
                >
                  Leaderboard
                </button>
                <button
                  className={`block w-full px-4 py-2 text-left transition ${
                    darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                  }`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex font-medium">
            <motion.button
              className={`px-4 py-1 transition ${
                darkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              } rounded-l-full`}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </motion.button>
            <motion.button
              className={`px-4 py-1 border-l transition rounded-r-full ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-green-600 hover:border-green-600 hover:text-white"
                  : "bg-gray-100 border-gray-300 hover:bg-green-500 hover:border-green-500 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/login")}
            >
              Log In
            </motion.button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;