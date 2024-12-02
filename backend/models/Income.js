const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  monthlyIncome: { type: Number, required: true },
  yearlyIncome: { type: Number, required: true }
});

module.exports = mongoose.model('Income', incomeSchema);
