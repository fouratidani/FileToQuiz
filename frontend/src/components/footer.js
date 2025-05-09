import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';
import { useDarkMode } from '../context/darkMode';


function Footer() {
  const { darkMode } = useDarkMode(); // Get dark mode state

  return (
    <div className={`p-4 sm:p-6 md:p-8 lg:p-10 mb-4 sm:mb-6 md:mb-[1%] ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <footer className={`h-52 ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
      }`}>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          <div className="col-span-2">
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              FILE2SUIZ - CREATE QUIZZES INSTANTLY
            </h3>
            <p className={`mb-2 text-1xl font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>NEED HELP?</p>
            <p className="text-green-500 mb-4 text-2xl font-bold">(+126) 99-999-999</p>
            <p className={`mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              123 Knowledge Street, Quiz City, QC 12345
              <br />
              <a href="mailto:support@quizgenerator.com" className={darkMode ? 'text-white' : 'text-black'}>
                support@quizgenerator.com
              </a>
            </p>
            <div className="flex space-x-4 mb-4">
              {[FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaPinterest].map((Icon, index) => (
                <a 
                  key={index}
                  href="aaa"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-2xl p-2 rounded-full ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={Icon.name.replace('Fa', '')}
                >
                  <Icon className={darkMode ? 'text-gray-200' : 'text-gray-700'} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Features Section */}
          <div>
            <h3 className={`text-xl font-extrabold ${
              darkMode ? 'text-white' : 'text-black'
            }`}>FEATURES</h3>
            <ul>
              {['Upload Files', 'Generate Quiz', 'Edit Questions', 'Export Quiz', 'Share with Others'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className={`block mt-1 hover:text-green-500 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className={`text-xl font-extrabold ${
              darkMode ? 'text-white' : 'text-black'
            }`}>RESOURCES</h3>
            <ul>
              {['Help Center', 'FAQs', 'Contact Support', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className={`block mt-1 hover:text-green-500 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Section */}
          <div>
            <h3 className={`text-xl font-extrabold ${
              darkMode ? 'text-white' : 'text-black'
            }`}>GET STARTED</h3>
            <ul>
              {['Sign Up', 'Log In', 'Browse Templates'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className={`block mt-1 hover:text-green-500 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className={`container mx-auto mt-10 text-center ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          <p className="font-bold">SUBSCRIBE FOR UPDATES & NEW FEATURES</p>
          <div className="flex justify-center mt-4">
            <div className="w-1/2 flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 rounded-l-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300'
                }`}
              />
              <button className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md ${
                darkMode ? 'hover:bg-green-600' : 'hover:bg-green-600'
              }`}>
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={`mt-5 flex justify-between items-center border-t pt-4 ${
          darkMode ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-700'
          }`}>&copy; 2024 Quiz Generator. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;