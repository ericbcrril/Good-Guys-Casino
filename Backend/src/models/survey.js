const mongoose = require('mongoose');

const survey = new mongoose.Schema({
    answer: Boolean,
    minigame: Number,
    idUser: String,
}, {versionKey: false });

module.exports = mongoose.model('survey', survey);