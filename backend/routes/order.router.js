const {Router} = require('express');
const {createOrder} = require('../controllers/order.controller')

const router = Router();

router.post('/order',  createOrder);

module.exports = router;