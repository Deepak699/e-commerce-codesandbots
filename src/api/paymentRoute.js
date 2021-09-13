const express = require("express");
const Product = require("../models/productModel");
const Order = require("../models/orders");
const auth = require("../auth/auth");
const crypto = require("crypto");
const razorpay = require("razorpay");
const route = express.Router();
route.post("/orders/:user_id", async (req, res) => {
  const pay = new razorpay({
    key_id: process.env.PUBLIC_KEY,
    key_secret: process.env.PRIVATE_KEY,
  });

  let Total_Price = 0;
  var store = [];
  const data = await Order.find({ owner: req.params.user_id });
  for (let i = 0; i < data.length; i++) {
    const prod = await Product.findById(data[i].product);
    Total_Price = Total_Price + prod.price;
  }
  options = {
    amount: Total_Price * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  pay.orders.create(options, (err, order) => {
    try {
      res.status(201).send(order);
    } catch (error) {
      res.status(401).send(error);
    }
  });
});
route.post("/verify", auth, async (req, res) => {
  try {
    const hmac = crypto.createHmac("sha256", process.env.PRIVATE_KEY);
    hmac.update(
      req.body.body.razorpay_order_id + "|" + req.body.body.razorpay_payment_id
    );
    let generatedSignature = hmac.digest("hex");
    if (generatedSignature == req.body.body.razorpay_signature) {
      res.status(201).send({ msg: "success" });
      const orders = await Order.find({ owner: req.user._id });
      orders.forEach(async (order) => {
        (order.PaymentId = req.body.body.razorpay_payment_id),
          (order.RazerpayOrderId = req.body.body.razorpay_order_id);
        await order.save();
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "payment failed" });
  }
  // gen_sig = crypto.hmac_sha256(
  //   "order_HvithaMOpZ0nMc" + "|" + "pay_HviuR7hhq5cuXS",
  //   process.env.PRIVATE_KEY
  // );
});
module.exports = route;
