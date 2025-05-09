import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/darkMode';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { darkMode } = useDarkMode();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login');
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
            Sign in to your account
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
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-4 border ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-4 border ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:ring-green-600 text-green-600'
                    : 'text-green-600 focus:ring-green-500 border-gray-300'
                } rounded`}
              />
              <label
                htmlFor="remember-me"
                className={`ml-2 block text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className={`font-medium ${
                  darkMode 
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-green-600 hover:text-green-500'
                }`}
              >
                Forgot your password?
              </a>
            </div>
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
              transition={{ delay: 0.4 }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </motion.button>
          </div>
          
          <div className="text-center">
            <motion.p
              className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Don't have an account?{' '}
              <Link
                to="/signup"
                className={`font-medium ${
                  darkMode 
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-green-600 hover:text-green-500'
                }`}
              >
                Sign up
              </Link>
            </motion.p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;