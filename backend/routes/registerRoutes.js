// backend/routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model set up

// Register route
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if user exists
router.get('/check-user', async (req, res) => {
  try {
    const user = await User.findOne();
    res.status(200).json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
