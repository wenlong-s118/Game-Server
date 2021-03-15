var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  lobbyID:{ type: mongoose.Schema.Types.ObjectId, ref:"Lobby"},
  sessionID: String,
  username: String,
});

module.exports= mongoose.model("User", userSchema);
