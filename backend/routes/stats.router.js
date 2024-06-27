const {Router} = require('express');
const { getStats, getCategoriesStats } = require('../controllers/stats.controller');


const router = Router();

router.get('/stats', getStats);
router.get('/categories/stats', getCategoriesStats);


module.exports = router;