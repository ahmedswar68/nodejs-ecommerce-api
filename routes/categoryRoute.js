const express= require('express');
const { getCategories,createCategory, getCategoryById } = require('../services/categoryService');
const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
module.exports = router;