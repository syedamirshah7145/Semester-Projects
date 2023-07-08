const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalPostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('share', shareSchema);