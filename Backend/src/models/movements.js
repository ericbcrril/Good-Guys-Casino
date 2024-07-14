const mongoose = require('mongoose');



const movement = new mongoose.Schema({
    idUser: {type: String},
    quantity: {type: Number},
    dataTime: {type: Date},
}, { versionKey: false });

module.exports = mongoose.model('movement', movement);