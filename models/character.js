var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  character: String,
  lootamount: Number,
  loot: [{type: mongoose.Schema.Types.ObjectId, ref: 'Loot'}],
  position: {type: mongoose.Schema.Types.ObjectId, ref: "Position"},
  onRoof: Boolean,
  hostages: [{type: mongoose.Schema.Types.ObjectId, ref: "Hostage"}],
  cardsInHand: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card"}],
  cardsInDeck: [{ type: mongoose.Schema.Types.ObjectId,ref: "Card"}],
  inTurn: Boolean,
  turnNumber: Number,
  finishedTurn: Boolean,
  bulletsRemaining: Number
});

module.exports= mongoose.model("Character", characterSchema);
