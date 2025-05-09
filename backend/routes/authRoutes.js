const express = require('express');
const { register, login, verifyToken } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Verify token route
router.get('/verify', auth, verifyToken);

module.exports = router;