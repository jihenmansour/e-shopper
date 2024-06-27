const Order = require("../models/order.model");
const Product = require("../models/product.model");

//Get Monthly Stats
const getStats = async (req, res) => {
  const data = await Order.aggregate([
    { $unwind: "$OrderItems" },
    {
      $lookup: {
        from: "products",
        localField: "OrderItems.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
        },
        totalIncome: {
          $sum: {
            $multiply: ["$productDetails.price", "$OrderItems.quantity"],
          },
        },
        totalSales: {
          $sum: "$OrderItems.quantity",
        },
        totalClients: {
          $addToSet: "$user",
        },
      },
    },
    {
      $project: {
        month: "$_id.month",
        categories: 1,
        totalIncome: 1,
        totalSales: 1,
        totalClients: { $size: "$totalClients" },
        _id: 0,
      },
    },

    { $sort: { month: 1 } },
  ]);

  let totalIncome = 0;
  totalSales = 0;
  totalClients = 0;
  data.map((item) => {
    (totalIncome += item.totalIncome),
      (totalSales += item.totalSales),
      (totalClients += item.totalClients);
  });

  res.status(200).json({
    data,
    totalIncome,
    totalSales,
    totalClients,
  });
};

// Get Monthly Categories Stats
const getCategoriesStats = async (req, res) => {
  const currentMonth = new Date().getMonth() + 1;

  const data = await Order.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$createdAt" }, currentMonth] } } },
    { $unwind: "$OrderItems" },
    {
      $lookup: {
        from: "products",
        localField: "OrderItems.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $lookup: {
        from: "categories",
        localField: "productDetails.categories",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          category: "$categoryDetails.name",
        },
        totalIncome: {
          $sum: {
            $multiply: ["$productDetails.price", "$OrderItems.quantity"],
          },
        },
        totalSales: {
          $sum: "$OrderItems.quantity",
        },
        totalClients: {
          $addToSet: "$user",
        },
      },
    },
    {
      $project: {
        category: "$_id.category",
        totalIncome: 1,
        totalSales: 1,
        _id: 0,
      },
    },
    { $sort: { totalSales: 1 } },
  ]);

  res.status(200).json(data);
};


module.exports = {
  getStats,
  getCategoriesStats
};
