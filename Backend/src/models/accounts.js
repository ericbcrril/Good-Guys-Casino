const mongoose = require('mongoose');

const accounts = new mongoose.Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    user: {type: String},
    password: {type: String}
}, { versionKey: false });

module.exports = mongoose.model('accounts', accounts);