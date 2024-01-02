
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

module.exports = db;
