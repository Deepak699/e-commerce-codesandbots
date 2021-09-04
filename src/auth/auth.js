const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verifiedToken = jwt.verify(token, "newproj");
    const user = await Users.findOne({
      _id: verifiedToken._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please Authorize" });
  }
};

module.exports = auth;
