# 📄➔❓ FileTOquiz

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/fouratidani/FileTOquiz/pulls)

Convert any document into interactive quizzes automatically! Perfect for students, educators, and lifelong learners.

## ✨ Features

- 📂 Supports PDF file format
- 🧠 AI-powered question generation (Gemini API)
- 📊 Performance analytics

## 🚀 Getting Started

### Frontend Setup (React)

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
```bash
npm install
```
3. Configure API key:

Open src/pages/ChatbotPage.js
Replace YOUR_GEMINI_API_KEY with your actual Gemini API key
4. Run development server:
```bash
npm start
```
App will run on http://localhost:3000

### Backend Setup (Express.js)

1. Navigate to backend directory:
  ```bash
  cd backend
  ```
2. Install dependencies:
  ```bash
  cd backend
  ```
3. Configure environment variables:
   Create .env file from .env.example
  Update these values:
```bash
JWT_SECRET=your_secure_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
DB_HOST=your_mysql_host
DB_PASSWORD=your_mysql_password
```
4. Start the server:
```bash
npm run dev
```
Server will run on http://localhost:5000

### System Requirements
Node.js v16+

MySQL database

Gemini API key
npm run dev
