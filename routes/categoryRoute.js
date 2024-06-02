const express= require('express');
const { getCategories,createCategory, getCategoryById, updateCategory, deleteCategory } = require('../services/categoryService');
const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);

router.route('/:id')
.get(getCategoryById)
.put(updateCategory)
.delete(deleteCategory);

module.exports = router;