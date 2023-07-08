const mongoose = require('mongoose');

const eventAttendeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  timestamp: { type: Date, default: Date.now },
  rsvpStatus: String,
});

module.exports = mongoose.model('eventAttendee', eventAttendeeSchema);
