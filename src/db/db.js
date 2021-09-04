const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://deepak:deepak12345@cluster0.ybj04.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });
