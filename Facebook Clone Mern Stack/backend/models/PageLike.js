const mongoose = require('mongoose');

const pageLikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
  timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("pageLike", pageLikeSchema)