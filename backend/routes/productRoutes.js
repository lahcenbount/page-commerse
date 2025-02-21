const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;