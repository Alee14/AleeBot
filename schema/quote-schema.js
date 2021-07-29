const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const quoteSchema = mongoose.Schema({
    quoteID: reqString,
    author: reqString,
    authorImage: reqString,
    quote: reqString,
    year: reqString

})

module.exports = mongoose.model('quote', quoteSchema)