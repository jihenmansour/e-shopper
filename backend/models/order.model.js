const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "cancelled"],
      default: "pending",
      required: true,
    },
    totalAmount: { type: Number, required: true, default: 1 },
    shippingAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
