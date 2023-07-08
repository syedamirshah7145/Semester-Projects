const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: { type: String, required: true },
  caption: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('photo', photoSchema);
