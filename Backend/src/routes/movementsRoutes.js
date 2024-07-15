const express = require('express');
const movementsController = require('../controllers/movementsController');
const router = express.Router();

router.get('/', movementsController.getItems);
router.get('/:id', movementsController.getItemById);
router.get('/key/:key', movementsController.getItemByKey);
router.post('/', movementsController.createItem);
router.put('/:id', movementsController.updateItem);
router.delete('/:id', movementsController.deleteItem);

module.exports = router;