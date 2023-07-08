const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: String,
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reactionType: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('reaction', reactionSchema);
