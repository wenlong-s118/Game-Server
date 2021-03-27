var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  lobbyID:{ type: mongoose.Schema.Types.ObjectId, ref:"Lobby"},
  sessionID: String,
  username: String,
  ready: Boolean
});

module.exports= mongoose.model("User", userSchema);
