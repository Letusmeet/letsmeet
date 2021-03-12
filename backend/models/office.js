const mongoose = require('mongoose')

const officeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    membersoffice: [{
        memberid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        designation: {
            type: String,
            required: true,
            default: "Employee"
        }
    }],
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],

})

module.exports = mongoose.model('Office', officeSchema)
