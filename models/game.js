var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
  sessionID: String,
  lobbbyID: {type: mongoose.Schema.Types.ObjectId, ref: "Lobby"},
  round: String,
  phase: String,
  currentPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Character"}
});



module.exports = mongoose.model("Game", gameSchema);
