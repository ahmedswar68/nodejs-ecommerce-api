const expressAsyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const { default: slugify } = require("slugify");

exports.getCategories = expressAsyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.body.limit || 3;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});
exports.createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
