var mongoose = require("mongoose");




var roundSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  cardsPlayed: [{
    id: {type: mongoose.Schema.Types.ObjectId, ref: "Card"},
    character: String,
    card: String
  }],
  phases:[String],
  roundType: String,
  stationRound: Boolean,
  turnsInRound: Number,
  cardIsFaceUp: Boolean,
});



module.exports = mongoose.model("Round", roundSchema);
