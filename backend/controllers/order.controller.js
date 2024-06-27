const Order = require("../models/order.model");
const User = require("../models/user.model");
const ExcelJS = require('exceljs');
const CustomError = require("../error/custom.error");

// Create Order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    await User.updateMany(
      { _id: order.user },
      { $push: { orders: order._id } }
    );
    res.status(200).json(order);
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
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const search = req.query.search ? req.query.search : "";
  const total = await Order.find().count();

  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;
  const data = await Order.find({})
    .populate({
      path: "OrderItems.product",
      model: "Product",
    })
    .populate("user")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  res.status(200).json({
    data,
    page,
    total,
    totalPages,
    nextPage,
    previousPage
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
  const { id } = req.params;

  const order = await Order.findById({ _id: id });

  if (!order) {
    throw new CustomError({ message: "Product not found" });
  }
  const oldUser = order.user.toString();
  const newUser = req.body.user;

  if(oldUser!==newUser){
    await User.updateMany(
      { _id: newUser },
      { $push: { orders: id } }
    );
    await User.updateMany(
      { _id: oldUser },
      { $pull: { orders: id } }
    );
  }
  await Order.updateOne({ _id: id }, req.body);
  res.status(200).json({
    message: "Order updated successfully",
  });
};


// Export Excel
const exportExcel = async(req, res) => {
  const orders = await Order.find({})
  .populate({
    path: "OrderItems.product",
    model: "Product",
  })
  .populate("user");

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('orders list');

  worksheet.columns = [
    { header: 'Customer', key: 'customer', width: 30 },
    { header: 'Content', key: 'content', width: 30 },
    { header: 'Address', key: 'address', width: 30 },
    { header: 'Total', key: 'total', width: 30 },
    { header: 'Status', key: 'status', width: 30 }
  ];

  worksheet.getRow(1).eachCell(cell => {
    cell.font = { bold: true };
  });

  orders.map((order)=> {
    const products = order.OrderItems.map((item) =>
       `${item.quantity} of ${item.product.name}`
      ).join(', ');
    worksheet.addRow({
      customer: order.user.fullname,
      content: products,
      address: order.shippingAddress,
      total: order.total,
      status: order.status
    });
  })

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=orders list.xlsx');

  await workbook.xlsx.write(res);
  res.end()
}



//Delete Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    throw new CustomError("Order not found");
  }
 
  await order.deleteOne();

  await User.updateMany(
    { _id: order.user },
    { $pull: { orders: order._id } }
  );

  res.status(200).json({ message: "Order deleted successfully" });
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrders,
  getOrder,
  updateOrder,
  exportExcel,
  deleteOrder
};
