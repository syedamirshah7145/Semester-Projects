const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pageName: { type: String, required: true },
  description: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('page', pageSchema);
