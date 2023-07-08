const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pageName: { type: String, required: true },
    description: String,
    pictureUrl: String,
    dateCreated : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('page', pageSchema);
