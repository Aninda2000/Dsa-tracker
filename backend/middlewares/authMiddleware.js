const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
    console.log("Decoded token:", decoded); 
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
