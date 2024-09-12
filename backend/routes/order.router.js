const {Router} = require('express');
const {createOrder, getAllOrders, getOrders, getOrder, updateOrder, deleteOrder, exportExcel} = require('../controllers/order.controller')
const { upload } = require("../multer.config")

const router = Router();

router.post('/order', createOrder);
router.get('/orders/all', getAllOrders);
router.get('/orders', getOrders);
router.get('/order/:id', getOrder);
router.put('/order', upload.none(), updateOrder);
router.get('/orders/export', exportExcel);
router.delete('/order/:id', deleteOrder);

module.exports = router;