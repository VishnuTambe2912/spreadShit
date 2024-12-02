const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  monthlyExpenses: { type: Number, required: true },
  yearlyExpenses: { type: Number, required: true }
});

module.exports = mongoose.model('Expenses', expensesSchema);
