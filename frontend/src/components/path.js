import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/darkMode';

function Path() {
  const location = useLocation();
  const { darkMode } = useDarkMode(); // Get dark mode state

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    return (
      <motion.div 
        className={`w-full h-auto flex justify-center mt-2 ${
          darkMode
            ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800'
            : 'bg-gradient-to-r from-gray-100 via-white to-gray-100'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className={`flex p-4 rounded-full w-[95%] h-[80px] mt-1 shadow-md ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link 
              to="/" 
              className={`font-bold ml-7 text-lg ${
                darkMode
                  ? 'text-gray-300 hover:text-green-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Home
            </Link>
          </motion.div>
          <span className={`mx-3 mt-1 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>/</span>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link 
              to="/pages" 
              className={`font-bold text-lg ${
                darkMode
                  ? 'text-gray-300 hover:text-green-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pages
            </Link>
          </motion.div>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
              <React.Fragment key={to}>
                <span className={`mx-3 mt-1 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>/</span>
                {isLast ? (
                  <motion.span 
                    className={`font-bold text-lg ${
                      darkMode ? 'text-green-400' : 'text-green-500'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </motion.span>
                ) : (
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link 
                      to={to} 
                      className={`font-bold text-lg ${
                        darkMode
                          ? 'text-gray-300 hover:text-green-400'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Link>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </motion.div>
    );
  };

  return generateBreadcrumbs();
}

export default Path;