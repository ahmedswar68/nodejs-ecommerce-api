const express= require('express');
const { getCategories,createCategory } = require('../services/categoryService');
const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
module.exports = router;