var mongoose = require("mongoose");

var savedGameSchema = new mongoose.Schema({
  saverUserName: String,
  sessionID: String,
  lobbbyID: {type: mongoose.Schema.Types.ObjectId, ref: "Lobby"},
  round: String,
  phase: String,
  currentPlayer: Number,

});



module.exports = mongoose.model("SavedGame", savedGameSchema);
