var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  sessionID:[
    session: String,
  ],
  username: String,
});

module.exports= mongoose.model("Cart", cartSchema);
