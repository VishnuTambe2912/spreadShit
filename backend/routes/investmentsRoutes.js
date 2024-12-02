const express = require('express');
const Investments = require('../models/Investments');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Add new investments
router.post('/investments', authenticate, async (req, res) => {
  const { monthlyInvestment, safeAsset, stockMarketAsset } = req.body;
  try {
    const investments = new Investments({
      userId: req.user.id,
      monthlyInvestment,
      safeAsset,
      stockMarketAsset,
    });
    await investments.save();
    res.status(201).json(investments);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all investments for the authenticated user
router.get('/investments', authenticate, async (req, res) => {
  try {
    const investments = await Investments.find({ userId: req.user.id });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Update an investment by ID
router.put('/investments/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { monthlyInvestment, safeAsset, stockMarketAsset } = req.body;
  try {
    const updatedInvestments = await Investments.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { monthlyInvestment, safeAsset, stockMarketAsset },
      { new: true }
    );
    if (!updatedInvestments) return res.status(404).json({ msg: 'Investment not found' });
    res.json(updatedInvestments);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete an investment by ID
router.delete('/investments/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInvestment = await Investments.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedInvestment) return res.status(404).json({ msg: 'Investment not found' });
    res.status(200).json({ msg: 'Investment deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
