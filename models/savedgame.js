var mongoose = require("mongoose");

var savedGameSchema = new mongoose.Schema({
  userName: String,
  sessionID: String,
  lobbbyID: {type: mongoose.Schema.Types.ObjectId, ref: "Lobby"},
  gameID:{type: mongoose.Schema.Types.ObjectId, ref: "Game"}

});



module.exports = mongoose.model("SavedGame", savedGameSchema);
