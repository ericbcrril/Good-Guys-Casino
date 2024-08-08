// backend/controllers/itemController.js
const Item = require('../models/movements');

// Obtener todos los registros de una coleccion
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Obtener un registro por su ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

//Obtener registro por la clave, (Por un campo en este caso se uso el campo key)
exports.getItemByKey = async (req, res) => {
  try {
    const key = req.params.key; // Obtener la clave desde los parámetros de la solicitud
    console.log('recibo la llave', key);
    const item = await Item.find({ userId: key }); // Buscar una registro por su clave en la base de datos
    if (!item) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(item); // Devolver la registro encontrado como respuesta JSON
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Crear una nuevo registro
exports.createItem = async (req, res) => {
  console.log("Datos rrecibidos: ", req.body)
  try {
    const {
      userId, date, amount, totalggp, reason, platform
    } = req.body;
    const newItem = new Item({
      userId, date, amount, totalggp, reason, platform
    });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Actualizar una registro
exports.updateItem = async (req, res) => {
  try {
    const {
      userId, date, amount, totalggp, reason, platform
    } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        userId, date, amount, totalggp, reason, platform
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Eliminar un registro
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json({ mensaje: 'Registro eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};