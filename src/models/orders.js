const mongoose = require("mongoose");
const Product = require("./productModel");
const Schema = mongoose.Schema;
const orderSchema = Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
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
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
