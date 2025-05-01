const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Replace with your actual secret (keep it in .env for production)
const SECRET = process.env.JWT_SECRET || 'anindahds';

const authMiddleware = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.userId);
    console.log("Decoded token:", decoded); // Log the decoded token for debugging
    req.user = user; // You can now access req.user.userId
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
