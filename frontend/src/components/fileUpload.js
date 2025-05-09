import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import { FaUpload } from "react-icons/fa";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleGenerate = () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }
    // Navigate to the Quiz page and pass the file as state
    navigate("/quiz", { state: { file } });
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white shadow-lg rounded-lg w-[50%] h-[450px] mx-auto mt-10 border border-gray-700">
      <h2 className="text-3xl font-bold mb-6">Upload a File</h2>
      
      <label className="relative flex flex-col items-center justify-center w-[350px] h-[180px] bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition-all duration-300">
        <FaUpload className="text-gray-400 text-4xl mb-2" />
        <span className="text-gray-300">Click to Upload</span>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>

      {file && <p className="mt-3 text-green-400">{file.name}</p>}

      <button
        onClick={handleGenerate}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-500 w-[350px] transition-all duration-300"
        disabled={!file}
      >
        Generate Quiz
      </button>
    </div>
  );
};

export default FileUpload;
