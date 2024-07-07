const {Router} = require('express');
const { upload } = require("../utils/multer.config");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/product.controller');

const router = Router();

router.post('/product',upload.array("images"),  createProduct);
router.get('/products/all', getAllProducts);
router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.put("/product/:id", upload.array("images"), updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;