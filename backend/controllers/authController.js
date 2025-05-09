const jwt = require('jsonwebtoken');
const pool = require('../db/config');

// Register a new user
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    
    const connection = await pool.getConnection();
    
    // Check if user already exists
    const [existingUsers] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUsers.length > 0) {
      connection.release();
      return res.status(400).json({ error: "Email already in use" });
    }
    
    // Store plaintext password directly
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    
    const userId = result.insertId;
    
    // Generate JWT token
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    connection.release();
    
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: userId,
        name,
        email
      }
    });
    
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
}

// Login user
async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    const connection = await pool.getConnection();
    
    // Find user
    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      connection.release();
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    const user = users[0];
    
    // Check password with direct comparison
    if (password !== user.password) {
      connection.release();
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    connection.release();
    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
}

// Verify token
async function verifyToken(req, res) {
  try {
    // The auth middleware already verified the token
    // and attached the user to the request
    res.json({
      valid: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (err) {
    console.error("❌ Token Verification Error:", err.message);
    res.status(500).json({ error: "Server error during token verification" });
  }
}

module.exports = {
  register,
  login,
  verifyToken
};