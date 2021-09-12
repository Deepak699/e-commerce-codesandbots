const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const prodRoute = require("./src/api/productRoute");
const addressRoute = require("./src/api/addressRoute");
const paymentRoute = require("./src/api/paymentRoute");
require("./src/db/db");
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(prodRoute);
app.use(addressRoute);
app.listen(PORT, () => {
  console.log("running");
});
