const mongoose = require('mongoose')


const BoardSchema = new mongoose.Schema({
    
    boardtitle: {
        type: String,
        required: true
    },
    cards : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    employees : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    date:{
        type: String,
        default: Date.now
    }


})

module.exports = mongoose.model('Board', BoardSchema)