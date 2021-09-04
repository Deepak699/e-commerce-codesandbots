const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const prodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 5,
    },
    features: {
      type: Array,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", prodSchema);
module.exports = Product;
