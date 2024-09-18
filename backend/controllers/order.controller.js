const Order = require("../models/order.model");
const User = require("../models/user.model");
const ExcelJS = require("exceljs");
const CustomError = require("../error/custom.error");
const Product = require("../models/product.model");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { OrderItems, user } = req.body;

    const findUser = await User.findById({ _id: user });

    if (!findUser) {
      throw new CustomError("user doesnt exist");
    }
    const findProducts = OrderItems.map(async (item) => {
      const product = await Product.findById({ _id: item.product });
      if (!product) {
        throw new CustomError("product or products doesnt exist");
      }
      if ((product.quantity === 0) | (product.quantity < item.quantity)) {
        throw new CustomError(`${product.name} quantity is not enough`);
      }
      await Product.findOneAndUpdate(
        { _id: item.product },
        { $inc: { quantity: -item.quantity } }
      );
    });

    await Promise.all(findProducts);

    const order = await Order.create(req.body);

    await User.updateMany(
      { _id: order.user },
      { $push: { orders: order._id } }
    );
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate({
      path: "OrderItems.product",
      model: "Product",
    })
    .populate("user");

  res.status(200).json(orders);
};

// Get Orders
const getOrders = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const skip = limit * (page - 1);

  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $unwind: "$OrderItems",
    },
    {
      $lookup: {
        from: "products",
        localField: "OrderItems.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $addFields: {
        "OrderItems.product": "$productDetails",
      },
    },
    {
      $group: {
        _id: "$_id",
        status: { $first: "$status" },
        total: { $first: "$total" },
        user: { $first: "$user" },
        shippingAddress: { $first: "$shippingAddress" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        __v: { $first: "$__v" },
        OrderItems: {
          $push: {
            product: "$OrderItems.product",
            quantity: "$OrderItems.quantity",
          },
        },
      },
    },
    {
      $facet: {
        orders: [
          { $match: { "OrderItems.product.name": { $regex: search } } },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        count: [
          { $match: { "OrderItems.product.name": { $regex: search } } },
          { $count: "total" },
        ],
      },
    },
  ];

  await Order.aggregate(pipeline).then((result) => {
    data = result[0].orders;
    total = result[0].count[0]?.total || 0;
  });
  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  res.status(200).json({
    data,
    page,
    total,
    totalPages,
    nextPage,
    previousPage,
  });
};

//Get Order
const getOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById({ _id: id })
    .populate({
      path: "OrderItems.product",
      model: "Product",
    })
    .populate("user");
  if (!order) {
    throw new CustomError("No order found");
  }

  res.status(200).json({ order });
};

// Update Order
const updateOrder = async (req, res) => {
  const orders = JSON.parse(req.body.orders);
  const updatedOrder = JSON.parse(req.body.updatedOrder);
  const newUser = updatedOrder.user;

  const findOrders = orders.map(async (item) => {
    const order = await Order.findById({ _id: item });
    if (!order) {
      throw new CustomError({ message: "Order not found" });
    }
    const oldUser = order.user.toString();

    if (oldUser !== newUser) {
      await User.updateOne({ _id: newUser }, { $push: { orders: item } });
      await User.updateOne({ _id: oldUser }, { $pull: { orders: item } });
    }
  });

  await Promise.all(findOrders);
  await Order.updateMany({ _id: {$in: orders} }, updatedOrder);

  res.status(200).json({
    message: "Order updated successfully",
  });
};

// Export Excel
const exportExcel = async (req, res) => {
  const search = req.query.search || "";
  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $unwind: "$OrderItems",
    },
    {
      $lookup: {
        from: "products",
        localField: "OrderItems.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $addFields: {
        "OrderItems.product": "$productDetails",
      },
    },
    {
      $group: {
        _id: "$_id",
        status: { $first: "$status" },
        total: { $first: "$total" },
        user: { $first: "$user" },
        shippingAddress: { $first: "$shippingAddress" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        __v: { $first: "$__v" },
        OrderItems: {
          $push: {
            product: "$OrderItems.product",
            quantity: "$OrderItems.quantity",
          },
        },
      },
    },
    { $match: { "OrderItems.product.name": { $regex: search } } },
  ];
  const orders = await Order.aggregate(pipeline);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("orders list");

  worksheet.columns = [
    { header: "Customer", key: "customer", width: 30 },
    { header: "Content", key: "content", width: 30 },
    { header: "Address", key: "address", width: 30 },
    { header: "Total", key: "total", width: 30 },
    { header: "Status", key: "status", width: 30 },
  ];

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  orders.map((order) => {
    const products = order.OrderItems.map(
      (item) => `${item.quantity} of ${item.product.name}`
    ).join(", ");
    worksheet.addRow({
      customer: order.user.fullname,
      content: products,
      address: order.shippingAddress,
      total: order.total,
      status: order.status,
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=orders list.xlsx");

  await workbook.xlsx.write(res);
  res.end();
};

//Delete Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    throw new CustomError("Order not found");
  }

  await order.deleteOne();

  await User.updateMany({ _id: order.user }, { $pull: { orders: order._id } });

  res.status(200).json({ message: "Order deleted successfully" });
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrders,
  getOrder,
  updateOrder,
  exportExcel,
  deleteOrder,
};
