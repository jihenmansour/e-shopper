const Product = require("../models/product.model");
const CustomError = require("../error/custom.error");
const Category = require("../models/category.model");

// Create Prodcut
const createProduct = async (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  const images = req.files.length > 0 ? 
  req.files?.map((file)=> file.filename) : ['1719418313830.png'];

  const productData = {
    ...parsedData,
    images: images,
  };
  const product = new Product(productData);
  await product.validate();

  const createdProduct = await product
    .save()
    .then((product) => product.populate("categories"));

  await Category.updateMany(
    { _id: createdProduct.categories },
    { $push: { products: createdProduct._id } }
  );

  res.json({
    message: "Product created successfully",
    product: createdProduct,
  });
};



// Get All Products
const getAllProducts = async (req, res) => {

    const products = await Product.find({});
    res.status(200).json(products);
  
};


// Get Products
const getProducts = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const sortField = req.query.sort || 'createdAt';
  const search = req.query.search;
  const skip = limit * (page - 1);
  const total = await Product.find().count();

  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;
  const data = await Product.aggregate([
    {
      $lookup: {
        from: "orders",
        let: { productId: "$_id" },
        pipeline: [
          { $unwind: "$OrderItems" },
          {
            $match: {
              $expr: { $eq: ["$OrderItems.product", "$$productId"] },
            },
          },
        ],
        as: "orders",
      },
    },
    {
      $addFields: {
        totalOrderedItems: {
          $sum: {
            $map: {
              input: "$orders",
              as: "order",
              in: "$$order.OrderItems.quantity",
            },
          },
        },
      },
    },

    {
      $project: {
        orders: 0,
      },
    },
    {
      $sort: {
        [sortField]: -1
      },
    },
    { $skip: skip },
    { $limit: limit }
    
    
  ]);

  res.status(200).json({
    data,
    page,
    total,
    totalPages,
    nextPage,
    previousPage,
  });
};


//Get Product
const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById({ _id: id }).populate("categories");
  if (!product) {
    throw new CustomError("No product found");
  }

  res.status(200).json({ product });
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const parsedData = JSON.parse(req.body.data);

  const updatedProduct = {
    ...parsedData,
  };

  updatedProduct.images = req.files.length > 0 ? 
  req.files?.map((file)=> file.filename) : parsedData.images;
  
  const product = await Product.findById({ _id: id });

  if (!product) {
    throw new CustomError(`No product found`);
  }
  const oldCategories = product.categories.map((x) => x.toString());
  const newCategories = updatedProduct.categories;

  const differenceNewOld = newCategories.filter(
    (element) => !oldCategories.includes(element)
  );

  const differenceOldNew = oldCategories.filter(
    (element) => !newCategories.includes(element)
  );

  await Category.updateMany(
    { _id: differenceNewOld },
    { $push: { products: id } }
  );
  await Category.updateMany(
    { _id: differenceOldNew },
    { $pull: { products: id } }
  );
const updateProduct = await Product.findOneAndUpdate(
    { _id: id }, 
    updatedProduct, 
    {
      new: true,
      runValidators: true, 
    }
  ).populate('categories');

  res.status(200).json({
    message: "Product updated successfully",
    updateProduct,
  });
};


// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    throw new CustomError("Product not found");
  }

  await product.deleteOne();

  await Category.updateMany(
    { _id: product.categories },
    { $pull: { products: product._id } }
  );

  res.status(200).json({ message: "Product deleted successfully" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
