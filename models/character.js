var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  lobbyID:{ type: mongoose.Schema.Types.ObjectId, ref:"Lobby"},
  character: String,
  lootamount: Number,
  position: {
    car: Number,
    onRoof: Boolean
  },
  inTurn: Boolean,
  turnNumber: Number,
  finishedTurn: Boolean,
  bulletsRemaining: Number
});

module.exports= mongoose.model("Character", characterSchema);
