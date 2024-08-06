// backend/models/model.js
const mongoose = require('mongoose');

const userTokens = new mongoose.Schema({
  name: String,
  token: String,
  date: String,
  platform: String
});

module.exports = mongoose.model('userTokens', userTokens);