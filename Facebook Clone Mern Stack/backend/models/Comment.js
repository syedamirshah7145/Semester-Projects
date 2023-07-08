const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    targetId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required : true
    },
    targetType : {
        type : String,
        reuired : true
    },
    content : {
        type: String,
        required:true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('comment',commentSchema);