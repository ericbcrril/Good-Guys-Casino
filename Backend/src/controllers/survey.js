const Item = require('../models/survey');

exports.registerAnswer = async (req, res) => {
  try {
    const idUser = req.user.user._id;
    const { answer, minigame } = req.body;
    const newItem = new Item({
      idUser, answer, minigame
    });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.checkuser = async (req, res) => {
  try {
    const id = req.user.user._id;
    const account = await Item.findOne({ idUser: id });
    if (!account) {
      return res.status(404).json({ error: 'Usuario no ha contestado' });
    }
    res.status(200).send('El usuario contesto anteriormente');
  } catch (error) {

  }
}