const mongoose = require ('mongoose')

// Product schema

const ProductSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter product name"],
        unique: true
      },
      price: {
        type: Number,
        required: [true, "Please enter product price"],
      },

      quantity: {
        type: Number,
        default: 0,
      },
      description: {
        type: String,
      },
      image :{
        type: String
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