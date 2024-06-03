const expressAsyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const { default: slugify } = require("slugify");

exports.getCategories = expressAsyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

exports.getCategoryById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await CategoryModel.findById(id);
  if (!category)
    return next(new ApiError(`No category for this id ${id}`, 404));

  res.status(200).json({ data: category });
});

exports.updateCategory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category)
    return res
      .status(404)
      .json({ message: `Category not found for this id: ${id}` });

  res.status(200).json({ data: category });
});

exports.createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});


exports.deleteCategory = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category)
      return res
        .status(404)
        .json({ message: `Category not found for this id: ${id}` });
  
    res.status(204).json();
  });