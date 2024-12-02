const express = require('express');
const Income = require('../models/Income');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.post('/income', authenticate, async (req, res) => {
  const { monthlyIncome, yearlyIncome } = req.body;
  try {
    const income = new Income({ userId: req.user.id, monthlyIncome, yearlyIncome });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/income', authenticate, async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.id });
    res.json(income);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
