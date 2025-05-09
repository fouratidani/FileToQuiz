const jwt = require('jsonwebtoken');
const pool = require('../db/config');

async function auth(req, res, next) {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [decoded.id]
    );
    
    if (users.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'User not found' });
    }
    
    // Set user in request
    req.user = users[0];
    req.token = token;
    
    connection.release();
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
}

module.exports = auth;