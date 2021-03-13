const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }],
    manager: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    Roomicon: {
        type: String
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversations'
    }

})

module.exports = mongoose.model('Room', RoomSchema)
