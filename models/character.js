var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  character: String,
  lootamount: Number,
  car: Number,
  onRoof: Boolean,
  inTurn: Boolean,
  turnNumber: Number,
  finishedTurn: Boolean,
  bulletsRemaining: Number
});

module.exports= mongoose.model("Character", characterSchema);
