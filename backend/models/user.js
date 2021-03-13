const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    admin: {
        type: Boolean,
        default: false
    },
    manager: {
        type: Boolean,
        default: false,
    },
    managerof: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Office'
    },
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sentrequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

mongoose.model("User", userSchema)