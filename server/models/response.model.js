
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    keyword: String,
    response: String,
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
