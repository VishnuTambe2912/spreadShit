const mongoose = require('mongoose');

const investmentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  monthlyInvestment: { type: Number, required: true },
  safeAsset: { type: Number, required: true },
  stockMarketAsset: { type: Number, required: true }
});

module.exports = mongoose.model('Investments', investmentsSchema);
