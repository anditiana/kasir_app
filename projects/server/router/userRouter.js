const express = require('express');

const transController = require('../controller/transaction');
const userController = require('../controller/userController');
const { vLogin } = require('../middleware/login');

const router = express.Router();

router.post('/login',vLogin ,userController.login);
router.patch('/transaction', transController.checkOut);
router.get('/products', userController.getProducts);
router.get('/categories', userController.getCategories);
router.put('/cart',userController.setToCart);
router.get('/cart', userController.checkCart);
router.put('/cart/:id', userController.editCart);
router.get('/getCart', userController.getCart);
router.post('/checkout', userController.checkOut);
router.get('/search', userController.findMenus);

module.exports = router;