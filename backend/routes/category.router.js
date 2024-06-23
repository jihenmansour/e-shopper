const {Router} = require('express');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory, getAllCategories } = require('../controllers/category.controller');
const { upload } = require("../utils/multer.config")

const router = Router();

router.post('/category',upload.single("image"),  createCategory);
router.get('/categories/all', getAllCategories);
router.get('/categories', getCategories);
router.get('/category/:id', getCategory);
router.put("/category/:id", upload.single("image"), updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;