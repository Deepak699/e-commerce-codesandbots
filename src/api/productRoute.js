const express = require("express");
const Product = require("../models/productModel");
const ref = require("referral-code-generator");
const Order = require("../models/orders");
const Users = require("../models/userModel");
const auth = require("../auth/auth");
const route = express.Router();
route.post("/prod", async (req, res) => {
  try {
    // console.log(req.body);
    const prod = await new Product(req.body);
    await prod.save();
    res.status(201).send(prod);
  } catch (error) {
    res.status(400).send(error);
  }
});
route.post("/", async (req, res) => {
  try {
    const user = await new Users(req.body);
    const token = await user.genAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (e) {
    return res.status(500).send(e);
  }
});
// route.patch("/getprod/:prodid?/:couponCode?", auth, async (req, res) => {
//   try {
//     if (!req.query.prodid && !req.query.couponCode) {
//       const products = await Product.find();
//       res.status(200).send(products);
//     } else if (req.query.prodid && !req.query.couponCode) {
//       const product = await Product.findById({ _id: req.query.prodid });
//       res.status(200).send(product);
//     } else if (req.query.prodid && req.query.couponCode) {
//       const couponcode = await Discount.find({
//         couponName: req.query.couponCode,
//       });
//       const product = await Product.findById({ _id: req.query.prodid });

//       // const updatedProduct = await Product.findByIdAndUpdate(product._id, {
//       //   discountedPrice: discountedPrice,
//       // });
//       const userID = req.user._id;
//       const findUser = await Users.findById({ _id: userID });
//       const len = findUser.couponAppliedItems.length;
//       const user = await Users.findByIdAndUpdate(userID, {
//         coupon: couponcode[0]._id,
//         $push: { couponAppliedItems: product._id },
//       });
//       await user.save();

//       Users.findById({ _id: user._id })
//         .populate("coupon")
//         .populate("couponAppliedItems")
//         .then((items) => {
//           items.couponAppliedItems.forEach((items) => {
//             items.discountedPrice =
//               (couponcode[0].percentage / 100) * items.price;
//           });
//           res.json(items);
//         });
//     }
//     //  else if (!req.query.prodid && req.query.couponCode) {
//     //   const couponcode = await Discount.find({
//     //     couponName: req.query.couponCode,
//     //   });
//     //   const products = await Product.find();
//     //   const userID = req.user._id;
//     //   products.forEach(async (item) => {
//     //     const prod = Product.findById({ id: item._id });
//     //     const user = await Users.findByIdAndUpdate(userID, {
//     //       coupon: couponcode[0]._id,
//     //       couponAppliedItems: prod._id,
//     //     });
//     //     await user.save();
//     //   });
//     // }
//   } catch (error) {}
// });

// GET Products By Id
route.get("/products/:id?", async (req, res) => {
  try {
    if (!req.query.id) {
      const products = await Product.find({});
      res.status(200).send(products);
    } else if (req.query.id) {
      const product = await Product.findById(req.query.id);
      res.status(200).send(product);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
//add to cart
route.post("/addtocart/:productid/:quantity", auth, async (req, res) => {
  try {
    const prod = await Product.findById(req.params.productid);
    const order = await Order.find({ product: prod._id });
    const cart = await new Order({
      owner: req.user._id,
      product: prod._id,
      quantity: req.params.quantity,
    });
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});
// get cart
route.get("/cart", auth, async (req, res) => {
  try {
    const prod = await Order.find().populate("product").populate("owner");
    res.status(201).send(prod);
  } catch (error) {
    res.status(400).send(error);
  }
});
//remove product from cart
route.delete("/deletecart/:orderid", auth, async (req, res) => {
  try {
    const prod = await Order.findByIdAndDelete(req.params.orderid);
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
});
//update quantity
route.put("/updatecart/:orderid/:quantity", auth, async (req, res) => {
  try {
    const updateorder = await Order.findByIdAndUpdate(req.params.orderid, {
      quantity: req.params.quantity,
    });
    res.status(201).json({ message: "Order Updated" });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = route;
