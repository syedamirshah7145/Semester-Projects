const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    friendId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    status : {
        type : String,
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.Schema(friendSchema);