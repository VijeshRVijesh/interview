const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'Admin', 'User'],
        default: 'visitor',
    },
    post: {
        type: String
    },
}, { collection: 'user-data' })

const model = mongoose.model('UserData', User)

module.exports = model