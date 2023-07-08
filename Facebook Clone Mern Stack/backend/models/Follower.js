const mongoose = require('mongoose')

const followerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    targetType : String,
    timestamp : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("follower",followerSchema)