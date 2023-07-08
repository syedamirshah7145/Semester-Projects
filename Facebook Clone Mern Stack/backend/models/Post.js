const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        required : true
    },
    imgUrl: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    targetType: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post',postSchema);