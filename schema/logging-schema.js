const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const loggingSchema = mongoose.Schema({
    _id: reqString,
    logChannel: reqString
})

module.exports = mongoose.model('logging', loggingSchema)