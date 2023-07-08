const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    content : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
    readStatus : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model("notification", notificationSchema);