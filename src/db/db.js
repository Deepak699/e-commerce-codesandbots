const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });
