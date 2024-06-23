const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please enter product name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter quantity"],
  },
});

const orderSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "cancelled"],
      default: "pending",
    },
    OrderItems: [OrderItemSchema],
    total: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter user name"],
    },
    shippingAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
