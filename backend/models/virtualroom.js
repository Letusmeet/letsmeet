const mongoose = require('mongoose')


const RoomSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    members:[{
        memberid:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        designation:{
            type:String,
            required:true,
            default:"Employee"
        }
        
    }],
    boards:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Board'
    }],
    Roomicon:{
        type:String
    },
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conversations'
    }

})

module.exports = mongoose.model('Room', RoomSchema)