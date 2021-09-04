const express = require("express");
const app = express();
require("dotenv").config();
const prodRoute = require("./src/api/productRoute");
require("./src/db/db");
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(prodRoute);
app.listen(PORT, () => {
  console.log("running");
});
