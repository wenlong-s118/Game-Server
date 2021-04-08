var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
  sessionID: String,
  lobbbyID: {type: mongoose.Schema.Types.ObjectId, ref: "Lobby"},
  roundIndex: Number,
  turnIndex: Number,
  playerIndex: Number,
  phase: String,
  currentPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Character"},
  noChar: Number,
  cardInStackIndex: Number,
  loaded: Boolean
});



module.exports = mongoose.model("Game", gameSchema);
