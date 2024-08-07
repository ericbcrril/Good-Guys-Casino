const express = require('express');
const router = express.Router();
const { validateToken } = require('../JWT');
const accountsController = require('../controllers/accountsController');

router.post('/login', accountsController.login);
router.post('/register', accountsController.createItem);


router.get('/profile', validateToken, accountsController.getProfile); // Ruta estática primero
router.get('/Authentication', validateToken, accountsController.checkAuth);
router.put('/addggp', validateToken, accountsController.GGP);

router.get('/', accountsController.getItems);
router.get('/:id', accountsController.getItemById);
router.put('/:id', accountsController.updateItem);
router.put('/updateGGP/:id', accountsController.updateTotalGGP);
router.delete('/:id', accountsController.deleteItem);


module.exports = router;
