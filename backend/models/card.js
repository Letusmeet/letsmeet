const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    },
    comments: [{
        by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        body: String,
        date: {
            type: String,
            default: Date.now,
        }

    }]


})


module.exports = mongoose.model("Card", cardSchema)