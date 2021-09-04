const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter the Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter the Mobile Number"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.methods.genAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "newproj");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
