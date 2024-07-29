const express = require('express');
const surveyController = require('../controllers/survey');
const router = express.Router();

router.post('/survey', surveyController.registerAnswer);

module.exports = router;