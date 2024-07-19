import movement from "../models/movements";


exports.getMovements = async (req, res) => {
    try {
        const movements = await movement.find();
        res.json(movements);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
      }
}