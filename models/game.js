var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
  sessionID: String,
  userOrder:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],

  round: {type: mongoose.Schema.Types.ObjectId, ref: "Round"},
  phase: String,
  currentPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Character"}
});



module.exports = mongoose.model("Game", gameSchema);
