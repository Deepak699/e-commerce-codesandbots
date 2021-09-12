const mongoose = require("mongoose");
const Product = require("./userModel");
const AddressSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  line_1: { type: String, required: true },
  line_2: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true, default: 0 },
  phone_no: { type: Number, required: true, minlength: 10 },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
});
const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
