const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('conversation', conversationSchema);
