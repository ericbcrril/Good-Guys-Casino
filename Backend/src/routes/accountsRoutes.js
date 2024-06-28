const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const { validateToken } = require('../JWT');


router.get('/', accountsController.getItems);
router.get('/:id', accountsController.getItemById);
router.get('/profile', validateToken, accountsController.profile);
router.post('/login', accountsController.getItemByUser);
router.post('/register', accountsController.createItem);
router.put('/:id', accountsController.updateItem);
router.delete('/:id', accountsController.deleteItem);

module.exports = router;
