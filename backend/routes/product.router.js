const {Router} = require('express');
const { createProduct, upload, getProducts, deleteProduct } = require('../controllers/product.controller');


const router = Router();

router.post('/product', upload.single('image'), createProduct);
router.get('/products', getProducts);
router.delete("/product/:id", deleteProduct);

module.exports = router;