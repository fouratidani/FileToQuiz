import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/darkMode';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { darkMode } = useDarkMode();
  const { currentUser, updateProfile, error: authError } = useAuth();
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Load user data when component mounts or currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setEmail(currentUser.email || '');
      setPhoneNumber(currentUser.phoneNumber || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile({
        firstName,
        lastName,
        email,
        phoneNumber
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className={`min-h-screen flex flex-col md:flex-row p-4 md:p-10 justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Sidebar */}
      <div className={`w-full md:w-1/4 shadow-md rounded-lg p-4 mb-4 md:mb-0 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <img
            src="/placeholder.svg?height=120&width=120"
            alt="User Profile"
            className="w-24 h-24 md:w-30 md:h-30 mb-2 rounded-full border-2 border-gray-500"
          />
          <h3 className={`text-lg md:text-xl font-extrabold mt-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {firstName} {lastName}
          </h3>
          <p className={`text-base md:text-lg ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {email}
          </p>
        </motion.div>

        {/* Navigation Menu */}
        <div className="flex flex-col gap-2 md:gap-4 mt-4 w-full">
          {['Account info', 'My order', 'My address', 'Change password'].map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-between px-4 py-2 rounded-md transition ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-green-600 text-white' 
                  : 'bg-gray-100 hover:bg-green-500 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{item}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className={`w-full md:w-3/4 shadow-md rounded-lg p-4 md:p-6 md:ml-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <motion.h2 
          className={`text-xl md:text-2xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Account Info
        </motion.h2>
        
        {error && (
          <motion.div 
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div 
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label 
                htmlFor="firstName" 
                className={`block text-lg font-bold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                First Name <span className='text-red-600'>*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className={`w-full py-3 px-4 rounded-lg border focus:outline-none focus:ring-2 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500'
                    : 'border-gray-300 focus:ring-green-400'
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </motion.div>

            {/* Last Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label 
                htmlFor="lastName" 
                className={`block text-lg font-bold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Last Name <span className='text-red-600'>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className={`w-full py-3 px-4 rounded-lg border focus:outline-none focus:ring-2 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500'
                    : 'border-gray-300 focus:ring-green-400'
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </motion.div>
          </div>

          {/* Email */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label 
              htmlFor="email" 
              className={`block text-lg font-bold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email Address <span className='text-red-600'>*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`w-full py-3 px-4 rounded-lg border focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500'
                  : 'border-gray-300 focus:ring-green-400'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          {/* Phone Number */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label 
              htmlFor="phoneNumber" 
              className={`block text-lg font-bold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Phone Number <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>(Optional)</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className={`w-full py-3 px-4 rounded-lg border focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500'
                  : 'border-gray-300 focus:ring-green-400'
              }`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </motion.div>

          {/* Save Button */}
          <motion.div
            className="flex justify-end mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              disabled={loading}
              className={`font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
                  : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              {loading ? 'SAVING...' : 'SAVE'}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

export default Profile;