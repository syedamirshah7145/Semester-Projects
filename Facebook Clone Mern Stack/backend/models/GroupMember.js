const mongoose = require('mongoose');

const groupMemberSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  joinDate: { type: Date, default: Date.now },
  role: String,
});

module.exports = mongoose.model('groupMember', groupMemberSchema);
