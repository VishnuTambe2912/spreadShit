const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    additionalInfo: { type: String, required: true },
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
