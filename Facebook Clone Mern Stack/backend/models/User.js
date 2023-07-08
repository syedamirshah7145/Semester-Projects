const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    friendId : {
        type : mongoose.Schema.Types.ObjectId,
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

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio : String,
    location: {
        type: String,
        required: true
    },
    profilePicture: String,
    registrationDate: {
        type: Date,
        default: Date.now
    },
    friends : [friendSchema]
})

module.exports = mongoose.model('user',userSchema);