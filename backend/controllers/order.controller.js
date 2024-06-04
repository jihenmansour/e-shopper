const Order = require("../models/order.model");

const createOrder = async (req, res) => {
    try {
      const product = await Order.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    createOrder
  }