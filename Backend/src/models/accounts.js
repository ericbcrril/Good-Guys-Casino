const mongoose = require('mongoose');

const accounts = mongoose.Schema({
    user: String,
    password: String
});

module.exports = mongoose.model('accounts', accounts);