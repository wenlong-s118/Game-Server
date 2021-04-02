var mongoose = require("mongoose");

var savedGameSchema = new mongoose.Schema({
  userName: String,
  sessionID: String,
  lobbbyID: {type: mongoose.Schema.Types.ObjectId, ref: "Lobby"},

  currentPlayer: Number,

});



module.exports = mongoose.model("SavedGame", savedGameSchema);
