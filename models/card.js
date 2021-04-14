var mongoose = require("mongoose");
var random = require("mongoose-simple-random");
var cardSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  characterID: { type: mongoose.Schema.Types.ObjectId, ref: "Character"},
  character: String,
  card: String,
  inHand: Boolean,
  inDeck: Boolean,
  actionStack: Boolean,
  isBullet: Boolean,
  isHostile: Boolean,
  order: Number
});
cardSchema.plugin(random);
module.exports= mongoose.model("Card", cardSchema);
