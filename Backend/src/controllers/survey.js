const Item = require('../models/survey');

exports.registerAnswer = async (req, res) => {
    try {
      const {
        answer, minigame
      } = req.body;
      const newItem = new Item({
        answer, minigame
      });
      await newItem.save();
      res.json(newItem);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Error del servidor');
    }
  };