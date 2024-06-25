const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

router.get('/', accountsController.getItems);
router.get('/:id', accountsController.getItemById);
router.post('/login', accountsController.getItemByUser);
router.post('/register', accountsController.createItem);
router.put('/:id', accountsController.updateItem);
router.delete('/:id', accountsController.deleteItem);

module.exports = router;
