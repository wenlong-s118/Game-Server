var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  //sessionID[]
  //string username
});

module.exports= mongoose.model("Cart", cartSchema);
