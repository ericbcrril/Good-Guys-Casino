<<<<<<< HEAD
// backend/models/model.js
const mongoose = require('mongoose');

const movements = new mongoose.Schema({
      userId: String,
      date: String, 
      amount: Number, 
      reason: String, 
      platform: String 
});

module.exports = mongoose.model('movements', movements);
=======
const mongoose = require('mongoose');



const movement = new mongoose.Schema({
    idUser: {type: String},
    quantity: {type: Number},
    dataTime: {type: Date},
}, { versionKey: false });

module.exports = mongoose.model('movement', movement);
>>>>>>> 0c70e20461d053d08aceeda5cab2ab4f7596cb3f
