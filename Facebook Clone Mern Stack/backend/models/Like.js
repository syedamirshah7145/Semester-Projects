const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    targetType : {
        type : String,
        required : true
    },
    targetId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('like',likeSchema);
