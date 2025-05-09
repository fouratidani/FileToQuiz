import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/darkMode';
import { useAuth } from '../context/AuthContext';

function SignUp() {
  const { darkMode } = useDarkMode();
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      // Redirect to login after successful signup
      navigate('/login', { state: { message: 'Account created successfully! Please log in.' } });
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div>
          <motion.h2
            className={`mt-6 text-center text-3xl font-extrabold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Create your account
          </motion.h2>
        </div>
        
        {error && (
          <motion.div 
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-2 mb-2"
            >
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                    darkMode 
                      ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400'
                      : 'border-gray-300 placeholder-gray-500 text-gray-900'
                  } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                    darkMode 
                      ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400'
                      : 'border-gray-300 placeholder-gray-500 text-gray-900'
                  } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-2"
            >
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </motion.div>
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                darkMode 
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </motion.button>
          </div>
          
          <div className="text-center">
            <motion.p
              className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Already have an account?{' '}
              <Link
                to="/login"
                className={`font-medium ${
                  darkMode 
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-green-600 hover:text-green-500'
                }`}
              >
                Sign in
              </Link>
            </motion.p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default SignUp;