const mongoose = require("mongoose");

// Category model
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter category name"],
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default:"1719418313830.png"
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref:'Product'

      }
    ]
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
