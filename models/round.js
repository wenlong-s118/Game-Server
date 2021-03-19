var mongoose = require("mongoose");

var roundSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  cardsPlayed: [{ id: {type: mongoose.Schema.Types.ObjectId, ref: "Card"},}],
  roundType: String,
  stationRound: Boolean,
  turnsInRound: Number,
  cardIsFaceUp: Boolean,
  phase: String,
});

module.exports = mongoose.model("Round", roundSchema);
