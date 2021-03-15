var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  characterID: { type: mongoose.Schema.Types.ObjectId, ref: "Character"},
  character: String,
  card: String,
  inHand: Boolean,
  inDeck: Boolean,
  isBullet: Boolean,
});

module.exports= mongoose.model("Card", cardSchema);
