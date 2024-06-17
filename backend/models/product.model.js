const mongoose = require ('mongoose')

// Product schema

const ProductSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter product name"],
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },

      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      description: {
        type: String,
      },
      categories : [
        {
          type: mongoose.Types.ObjectId,
          ref:"Category"
        }
      ]
    },
    {
      timestamps: true,
    }
  );

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;