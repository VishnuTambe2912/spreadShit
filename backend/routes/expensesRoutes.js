const express = require('express');
const Expenses = require('../models/Expenses');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Add new expenses
router.post('/expenses', authenticate, async (req, res) => {
  const { monthlyExpenses, yearlyExpenses } = req.body;
  try {
    const expenses = new Expenses({
      userId: req.user.id,
      monthlyExpenses,
      yearlyExpenses,
    });
    await expenses.save();
    res.status(201).json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all expenses for the authenticated user
router.get('/expenses', authenticate, async (req, res) => {
  try {
    const expenses = await Expenses.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Update an expense by ID
router.put('/expenses/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { monthlyExpenses, yearlyExpenses } = req.body;
  try {
    const updatedExpenses = await Expenses.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { monthlyExpenses, yearlyExpenses },
      { new: true }
    );
    if (!updatedExpenses) return res.status(404).json({ msg: 'Expense not found' });
    res.json(updatedExpenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete an expense by ID
router.delete('/expenses/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expenses.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedExpense) return res.status(404).json({ msg: 'Expense not found' });
    res.status(200).json({ msg: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
