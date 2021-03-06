var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  sessionID: String,
  username: String,
});

module.exports= mongoose.model("User", userSchema);
