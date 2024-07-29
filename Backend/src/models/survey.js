const mongoose = require('mongoose');

const survey = new mongoose.Schema({
    answer: Boolean,
    minigame: Number
});

module.exports = mongoose.model('survey', survey);