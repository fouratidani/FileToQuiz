const express = require('express');
const multer = require('multer');
const { generateQuiz, getUserQuizzes } = require('../controllers/quizController');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Generate quiz route
router.post('/generate', auth, upload.single('pdf'), generateQuiz);

// Get user's quizzes
router.get('/', auth, getUserQuizzes);

module.exports = router;