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
