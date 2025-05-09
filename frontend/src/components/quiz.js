import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../context/darkMode';

function Quizz() {
  const { currentUser } = useAuth();
  const { darkMode } = useDarkMode();
  
  // Quiz states
  const [selectedFile, setSelectedFile] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setQuizData(null);
    setError("");
    setUserAnswers({});
    setShowResults(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    setLoading(true);
    setError("");

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Use the correct API endpoint from our server code
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/quiz/generate`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Quiz data received:", data);
      setQuizData(data); // Store the complete response
      
      // Initialize userAnswers with empty values for each question
      const initialAnswers = {};
      data.quiz.forEach((_, index) => {
        initialAnswers[index] = "";
      });
      setUserAnswers(initialAnswers);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError("Failed to generate quiz: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer
    });
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    
    let score = 0;
    quizData.quiz.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    
    return score;
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    const initialAnswers = {};
    quizData.quiz.forEach((_, index) => {
      initialAnswers[index] = "";
    });
    setUserAnswers(initialAnswers);
    setShowResults(false);
  };

  // Helper function to determine button color
  const getButtonColor = (questionIndex, optionLabel, correctAnswer) => {
    if (!showResults) {
      // Before submission, just highlight selected answer
      return userAnswers[questionIndex] === optionLabel 
        ? (darkMode ? "#3b4252" : "#e0e0ff") 
        : (darkMode ? "#2e3440" : "#f0f0f0");
    } else {
      // After submission, show correct/incorrect
      if (optionLabel === correctAnswer) {
        // Correct answer is always green
        return darkMode ? "#2e3c2d" : "#c8e6c9"; // Dark/Light green
      } else if (userAnswers[questionIndex] === optionLabel) {
        // Selected wrong answer is red
        return darkMode ? "#3c2e2e" : "#ffcdd2"; // Dark/Light red
      } else {
        // Unselected wrong answers stay neutral
        return darkMode ? "#2e3440" : "#f0f0f0";
      }
    }
  };

  return (
    <div className="App" style={{ 
      padding: 20, 
      maxWidth: 800, 
      margin: "0 auto",
      color: darkMode ? "#e5e9f0" : "#333",
      backgroundColor: darkMode ? "#2e3440" : "#fff",
      minHeight: "100vh"
    }}>
      <div style={{ 
        padding: 15, 
        marginBottom: 20, 
        backgroundColor: darkMode ? "#3b4252" : "#e8f5e9",
        borderRadius: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <p style={{ margin: 0 }}>
            Logged in as: <strong>{currentUser?.firstName} {currentUser?.lastName || currentUser?.email || "User"}</strong>
          </p>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange} 
          style={{
            color: darkMode ? "#e5e9f0" : "#333",
            backgroundColor: darkMode ? "#3b4252" : "#fff",
            padding: "8px",
            borderRadius: "4px",
            border: darkMode ? "1px solid #4c566a" : "1px solid #ddd"
          }}
        />
        <button 
          onClick={handleUpload} 
          style={{ 
            marginLeft: 10, 
            padding: "8px 16px", 
            backgroundColor: darkMode ? "#5e81ac" : "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: 4,
            cursor: "pointer" 
          }}
        >
          Generate Quiz
        </button>
      </div>

      {loading && <p style={{ color: darkMode ? "#88c0d0" : "#2196F3" }}>⏳ Generating quiz...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {quizData && (
        <div style={{ textAlign: "left" }}>
          <h2 style={{ color: darkMode ? "#88c0d0" : "#2196F3" }}>🧠 Quiz on: {quizData.topic}</h2>
          
          {quizData.quiz.map((question, qIndex) => (
            <div 
              key={qIndex} 
              style={{ 
                marginBottom: 20, 
                padding: 15, 
                borderRadius: 8, 
                backgroundColor: darkMode ? "#3b4252" : "#f9f9f9",
                border: darkMode ? "1px solid #4c566a" : "1px solid #ddd" 
              }}
            >
              <h3 style={{ color: darkMode ? "#eceff4" : "#333" }}>
                {qIndex + 1}. {question.question}
              </h3>
              
              <div style={{ marginLeft: 20 }}>
                {question.options.map((option) => {
                  const buttonColor = getButtonColor(qIndex, option.label, question.correctAnswer);
                  
                  return (
                    <button 
                      key={option.label}
                      onClick={() => !showResults && handleAnswerSelect(qIndex, option.label)}
                      style={{ 
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 15px",
                        margin: "8px 0",
                        backgroundColor: buttonColor,
                        border: userAnswers[qIndex] === option.label 
                          ? `2px solid ${darkMode ? "#88c0d0" : "#3f51b5"}` 
                          : darkMode ? "1px solid #4c566a" : "1px solid #ddd",
                        borderRadius: 4,
                        cursor: showResults ? "default" : "pointer",
                        position: "relative",
                        transition: "background-color 0.2s",
                        color: darkMode ? "#e5e9f0" : "#333"
                      }}
                      disabled={showResults}
                    >
                      <span style={{ fontWeight: "bold", marginRight: 8 }}>
                        {option.label})
                      </span>
                      {option.text}
                      
                      {showResults && option.label === question.correctAnswer && (
                        <span style={{ 
                          position: "absolute", 
                          right: 15,
                          color: "green",
                          fontWeight: "bold"
                        }}>
                          ✓
                        </span>
                      )}
                      
                      {showResults && 
                       userAnswers[qIndex] === option.label && 
                       option.label !== question.correctAnswer && (
                        <span style={{ 
                          position: "absolute", 
                          right: 15,
                          color: "red",
                          fontWeight: "bold"
                        }}>
                          ✗
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {showResults && (
                <div style={{ 
                  marginTop: 10, 
                  padding: "8px 12px",
                  borderRadius: 4,
                  backgroundColor: userAnswers[qIndex] === question.correctAnswer 
                    ? (darkMode ? "#2e3c2d" : "#e8f5e9") 
                    : (darkMode ? "#3c2e2e" : "#ffebee"),
                  color: userAnswers[qIndex] === question.correctAnswer ? "green" : "red",
                  fontWeight: "bold"
                }}>
                  {userAnswers[qIndex] === question.correctAnswer 
                    ? "✓ Correct!" 
                    : `✗ Incorrect. The correct answer is ${question.correctAnswer}.`}
                </div>
              )}
            </div>
          ))}
          
          {!showResults ? (
            <button 
              onClick={submitQuiz}
              style={{ 
                padding: "10px 20px", 
                backgroundColor: darkMode ? "#5e81ac" : "#2196F3", 
                color: "white", 
                border: "none", 
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 16
              }}
            >
              Submit Quiz
            </button>
          ) : (
            <div>
              <h3 style={{ color: darkMode ? "#a3be8c" : "#4CAF50" }}>
                Your Score: {calculateScore()} out of {quizData.quiz.length}
              </h3>
              <button 
                onClick={resetQuiz}
                style={{ 
                  padding: "10px 20px", 
                  backgroundColor: darkMode ? "#d08770" : "#FF9800", 
                  color: "white", 
                  border: "none", 
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Debug section - can be removed in production */}
      {quizData && quizData.rawQuiz && (
        <div style={{ 
          marginTop: 30, 
          borderTop: darkMode ? "1px solid #4c566a" : "1px solid #ddd", 
          paddingTop: 20 
        }}>
          <details>
            <summary style={{ 
              cursor: "pointer", 
              color: darkMode ? "#81a1c1" : "#666" 
            }}>
              Show Raw Quiz Data
            </summary>
            <pre style={{ 
              textAlign: "left", 
              background: darkMode ? "#3b4252" : "#f4f4f4", 
              padding: 20, 
              borderRadius: 5, 
              overflow: "auto",
              color: darkMode ? "#e5e9f0" : "#333"
            }}>
              {quizData.rawQuiz}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default Quizz;