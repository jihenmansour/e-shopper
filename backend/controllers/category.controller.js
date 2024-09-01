const Category = require("../models/category.model");
const CustomError = require("../error/custom.error");
const Product = require("../models/product.model");

// Create Category
const createCategory = async (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  const images =
    req.files.length > 0
      ? req.files?.map((file) => file.filename)
      : ["1719418313830.png"];

  const categoryData = {
    ...parsedData,
    images: images,
  };

  const category = new Category(categoryData);
  await category.validate();

  const createdCategory = await category.save();

  await Product.updateMany(
    { _id: createdCategory.products },
    { $push: { categories: createdCategory._id } }
  );

  res.json({
    message: "Category created successfully",
    category: createdCategory,
  });
};

//Get All Categories
const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};

// Get Categories
const getCategories = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const skip = limit * (page - 1);
  const total = await Category.find({ name: { $regex: search } }).count();

  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  // Define the aggregation pipeline
  const pipeline = [
    {
      $match: {
        name: { $regex: search },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ];

  const data = await Category.aggregate(pipeline);

  res.status(200).json({
    data,
    page,
    total,
    totalPages,
    nextPage,
    previousPage,
  });
};

//Get Category
const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById({ _id: id }).populate("products");
  if (!category) {
    throw new CustomError("No category found");
  }

  res.status(200).json({ category });
};

// Update User
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const parsedData = JSON.parse(req.body.data);

  const updatedCategory = {
    ...parsedData,
  };

  updatedCategory.images =
    req.files.length > 0
      ? req.files?.map((file) => file.filename)
      : parsedData.images;

  const category = await Category.findById({ _id: id });

  if (!category) {
    throw new CustomError(`No category found`);
  }
  const oldProducts = category.products.map((x) => x.toString());
  const newProducts = updatedCategory.products;

  const differenceNewOld = newProducts.filter(
    (element) => !oldProducts.includes(element)
  );

  const differenceOldNew = oldProducts.filter(
    (element) => !newProducts.includes(element)
  );

  await Product.updateMany(
    { _id: differenceNewOld },
    { $push: { categories: id } }
  );
  await Product.updateMany(
    { _id: differenceOldNew },
    { $pull: { categories: id } }
  );
  await category.updateOne(updatedCategory, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    message: "Category updated successfully",
  });
};

// Delete User
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    throw new CustomError("Category not found");
  }

  await category.deleteOne();

  await Product.updateMany(
    { _id: category.products },
    { $pull: { categories: category._id } }
  );

  res.status(200).json({ message: "Category deleted successfully" });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
