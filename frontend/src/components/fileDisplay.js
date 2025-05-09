import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/darkMode";
import { FaEye, FaFilePdf, FaMagic, FaTimes, FaDownload } from "react-icons/fa";

// Mock database of PDFs - MAKE SURE TO USE YOUR ACTUAL GOOGLE DRIVE FILE IDs
const pdfDatabase = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React framework",
    thumbnail: "https://mira.bootlab.io/img/illustrations/intro-illustration-1.png",
    pdfUrl: "https://drive.google.com/file/d/1Hugr4IL1aLY7mjQIDRHZBdv0zCouxx6O/view?usp=sharing",
    date: "2023-05-15"
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    description: "Deep dive into modern JavaScript patterns",
    thumbnail: "https://mira.bootlab.io/img/illustrations/intro-illustration-2.png",
    pdfUrl: "https://drive.google.com/file/d/1Hugr4IL1aLY7mjQIDRHZBdv0zCouxx6O/view?usp=sharing",
    date: "2023-06-22"
  },
  {
    id: 3,
    title: "CSS Mastery",
    description: "Complete guide to modern CSS techniques",
    thumbnail: "https://mira.bootlab.io/img/illustrations/intro-illustration-3.png",
    pdfUrl: "https://drive.google.com/file/d/1Hugr4IL1aLY7mjQIDRHZBdv0zCouxx6O/view?usp=sharing",
    date: "2023-07-10"
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    description: "Backend development with Node.js",
    thumbnail: "https://mira.bootlab.io/img/illustrations/intro-illustration-4.png",
    pdfUrl: "https://drive.google.com/file/d/1Hugr4IL1aLY7mjQIDRHZBdv0zCouxx6O/view?usp=sharing",
    date: "2023-08-05"
  }
];

function PDFDisplay() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  // Convert Google Drive share link to embeddable preview URL
  const convertGoogleDriveUrl = (url) => {
    const fileId = url.match(/\/file\/d\/([^/]+)/)?.[1];

    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
  };

  // Convert to direct download URL
  const getDownloadUrl = (url) => {
    const fileId = url.match(/\/file\/d\/([^/]+)/)?.[1];

    return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : url;
  };

  const handleView = (pdf) => {
    setSelectedPdf(pdf);
    setIsModalOpen(true);
  };

  const handleGenerate = (pdf) => {
    navigate("/quiz", { state: { pdf } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  return (
    <motion.div
      className={`min-h-screen p-6 ${
        darkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
          : "bg-gradient-to-r from-gray-100 via-white to-gray-100"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className={`text-3xl font-bold mb-6 ${
            darkMode ? "text-green-400" : "text-green-500"
          }`}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Your PDF Library
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfDatabase.map((pdf) => (
            <motion.div
              key={pdf.id}
              className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
              }`}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={pdf.thumbnail}
                  alt={pdf.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}>
                    {pdf.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>
                    {pdf.date}
                  </span>
                </div>
                <p className={`text-sm mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {pdf.description}
                </p>
                
                <div className="flex justify-between mt-4">
                  <motion.button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleView(pdf)}
                  >
                    <FaEye className="mr-2" />
                    View
                  </motion.button>
                  
                  <motion.button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                      darkMode
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleGenerate(pdf)}
                  >
                    <FaMagic className="mr-2" />
                    Generate Quiz
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PDF Viewer Modal */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            ></div>
            
            <motion.div
              className={`relative z-10 w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className={`flex justify-between items-center p-4 border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}>
                <h3 className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  {selectedPdf?.title}
                </h3>
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-full ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <FaTimes className={darkMode ? "text-gray-300" : "text-gray-600"} />
                </button>
              </div>
              
              <div className="h-[70vh] p-4 overflow-hidden">
                {selectedPdf?.pdfUrl ? (
                  <iframe
                    src={convertGoogleDriveUrl(selectedPdf.pdfUrl)}
                    className="w-full h-full border-0"
                    title={selectedPdf.title}
                    allow="autoplay"
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className={`text-lg ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      PDF content not available
                    </p>
                  </div>
                )}
              </div>
              
              <div className={`p-4 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}>
                <div className="flex justify-between items-center">
                  <a
                    href={getDownloadUrl(selectedPdf?.pdfUrl)}
                    download
                    className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    <FaDownload className="mr-2" />
                    Download PDF
                  </a>
                  <button
                    onClick={closeModal}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          className={`mt-8 p-6 rounded-xl text-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-center text-5xl mb-4">
            <FaFilePdf className={darkMode ? "text-green-400" : "text-green-500"} />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>
            Upload New PDF
          </h3>
          <p className={`text-sm mb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Drag and drop your PDF file here or click to browse
          </p>
          <motion.button
            className={`px-6 py-2 rounded-lg font-medium ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Select File
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PDFDisplay;