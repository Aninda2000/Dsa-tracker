const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Login attempt with username:", username);
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
    // return res.status(200).json({ msg: 'Login successful' ,token: 'dummy_token'});
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).send('Server error');
  }
});
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ msg: 'Username already exists' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hash });
    await newUser.save();
    res.status(201).json({ msg: 'User created' });
  } catch(err) {
    console.log("Error during registration:", err);
    res.status(500).send('Server error');
  }
});
router.get('/profile', authMiddleware, (req, res) => {
  console.log("User profile request for userId:", req.user);
  res.json({ name: req.user.username });
});


module.exports = router;
