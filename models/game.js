var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
  sessionID: String,
  lobbbyID: {type: mongoose.Schema.Types.ObjectId, ref: "Lobby"},
  roundIndex: Number,
  phase: String,
  currentPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Character"}
});



module.exports = mongoose.model("Game", gameSchema);
