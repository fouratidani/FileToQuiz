const pool = require('../db/config');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');

// Generate a quiz from PDF
async function generateQuiz(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const pdfPath = req.file.path;
    const rawPdfData = fs.readFileSync(pdfPath);
    const pdfText = await pdfParse(rawPdfData);
    const cleanedText = pdfText.text.replace(/\s+/g, " ").trim().slice(0, 6000);

    const topic = cleanedText.split(".")[0] || "general knowledge";

    const prompt = `**Quiz on "${topic}"**
Generate a quiz with 5 multiple-choice questions based on the following content:

---
${cleanedText}
---

Each question should have 4 options (A, B, C, D) and the correct answer marked clearly. 
Format each question as:
1. Question text
A) Option A
B) Option B
C) Option C
D) Option D
Correct answer: [letter]

Make sure to clearly mark the correct answer for each question.`;

    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const quizText = aiResponse.data.candidates[0].content.parts[0].text;
    
    // Parse the quiz text into structured format
    const parsedQuiz = parseQuizText(quizText);

    // Save quiz to database
    const connection = await pool.getConnection();
    
    // Insert quiz
    const [quizResult] = await connection.query(
      'INSERT INTO quizzes (user_id, topic, raw_quiz) VALUES (?, ?, ?)',
      [req.user.id, topic, quizText]
    );
    
    const quizId = quizResult.insertId;
    
    // Insert questions and options
    for (const question of parsedQuiz) {
      const [questionResult] = await connection.query(
        'INSERT INTO questions (quiz_id, question_text, correct_answer) VALUES (?, ?, ?)',
        [quizId, question.question, question.correctAnswer]
      );
      
      const questionId = questionResult.insertId;
      
      for (const option of question.options) {
        await connection.query(
          'INSERT INTO options (question_id, option_label, option_text) VALUES (?, ?, ?)',
          [questionId, option.label, option.text]
        );
      }
    }
    
    connection.release();

    fs.unlinkSync(pdfPath); // cleanup
    res.json({ 
      topic, 
      rawQuiz: quizText,
      quiz: parsedQuiz
    });

  } catch (err) {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ error: "An error occurred while generating the quiz." });
  }
}

// Get user's quizzes
async function getUserQuizzes(req, res) {
  try {
    const connection = await pool.getConnection();
    
    const [quizzes] = await connection.query(
      'SELECT * FROM quizzes WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    
    // For each quiz, get its questions and options
    const quizzesWithDetails = [];
    
    for (const quiz of quizzes) {
      const [questions] = await connection.query(
        'SELECT * FROM questions WHERE quiz_id = ?',
        [quiz.id]
      );
      
      const questionsWithOptions = [];
      
      for (const question of questions) {
        const [options] = await connection.query(
          'SELECT * FROM options WHERE question_id = ?',
          [question.id]
        );
        
        questionsWithOptions.push({
          ...question,
          options: options.map(opt => ({
            label: opt.option_label,
            text: opt.option_text
          }))
        });
      }
      
      quizzesWithDetails.push({
        ...quiz,
        questions: questionsWithOptions
      });
    }
    
    connection.release();
    res.json(quizzesWithDetails);
  } catch (err) {
    console.error("❌ Error fetching quizzes:", err.message);
    res.status(500).json({ error: "Server error while fetching quizzes" });
  }
}

// Function to parse quiz text into structured format
function parseQuizText(quizText) {
  const questions = [];
  const lines = quizText.split('\n').filter(line => line.trim() !== '');
  
  let currentQuestion = null;
  let correctAnswer = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if line starts with a number followed by a period or parenthesis (likely a question)
    if (/^\d+[\.\)]/.test(line)) {
      // If we already have a question object, push it to questions array before creating a new one
      if (currentQuestion) {
        questions.push({
          ...currentQuestion,
          correctAnswer
        });
      }
      
      // Create new question object
      currentQuestion = {
        question: line.replace(/^\d+[\.\)]\s*/, ''),
        options: []
      };
      correctAnswer = null;
    } 
    // Check if line starts with A, B, C, or D (likely an option)
    else if (/^[A-D][\.\)]/.test(line)) {
      const option = {
        label: line.substring(0, 1),
        text: line.replace(/^[A-D][\.\)]\s*/, '')
      };
      
      // Check if this option is marked as correct
      if (line.toLowerCase().includes('(correct)') || line.toLowerCase().includes('correct answer')) {
        correctAnswer = option.label;
        // Remove the "correct" marker from the option text
        option.text = option.text.replace(/\s*$$correct$$/i, '').replace(/\s*$$correct answer$$/i, '');
      }
      
      if (currentQuestion) {
        currentQuestion.options.push(option);
      }
    }
    // Check if line indicates the correct answer
    else if (line.toLowerCase().includes('correct answer') || line.toLowerCase().includes('answer:')) {
      const match = line.match(/[A-D]/);
      if (match) {
        correctAnswer = match[0];
      }
    }
  }
  
  // Don't forget to add the last question
  if (currentQuestion) {
    questions.push({
      ...currentQuestion,
      correctAnswer
    });
  }
  
  return questions;
}

module.exports = {
  generateQuiz,
  getUserQuizzes
};