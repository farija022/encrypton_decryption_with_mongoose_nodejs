const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    data: {
        type: String
    }
})
const User = new mongoose.model('description', userSchema)
module.exports = userSchema;