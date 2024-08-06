// backend/controllers/itemController.js
const userTokens = require('../models/userTokens');
const bcrypt = require('bcryptjs');

// Comprobar si el token es valido
exports.validateToken = async (req, res) => { 
  try {
    const { user, token } = req.body;

    const tokenE = await bcrypt.hash(token, 10);

    const userToken = await userTokens.findOne({ token: tokenE });

    if (!userToken) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    return true;

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getProfile = async (req, res) => { 
  const user = req.user.user.user;
  console.log(req.user.user);
  const userToken = await userTokens.findOne({ user: user });
  if (!userToken) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({
      user: userToken.user,
      email: userToken.email,
      name: userToken.name,
      // Agrega más campos según sea necesario
  }); 
};

// Crear una nuevo registro
exports.createItem = async (req, res) => { 
  try {
    const {
      name, lastName, email, user, token
    } = req.body;

    const existingUser = await userTokens.findOne({ $or: [{ email: email }, { user: user }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario o email ya existen' });
    }
    const hash = await bcrypt.hash(token, 10);
    console.log(hash);
    const newAccount = new userTokens({
      name: name,
      lastName: lastName,
      email: email,
      user: user,
      token: hash
    });
    await newAccount.save();
    res.json(newAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Actualizar una registro
exports.updateItem = async (req, res) => { 
  try {
    const {
      user, token
    } = req.body;
    const updatedAccount = await userTokens.findByIdAndUpdate(
      req.params.id,
      {
        user, token
      },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(updatedAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Eliminar un registro
exports.deleteItem = async (req, res) => { 
  try {
    const deletedAccount = await userTokens.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json({ mensaje: 'Registro eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};