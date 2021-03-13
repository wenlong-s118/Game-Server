var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var roundSchema = new mongoose.Schema({
  cardsPlayed: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}, character: String, card: String,}],
  phases:[String],
  roundType: String,
  stationRound: Boolean,
  turnsInRound: Number,
  cardIsFaceUp: Boolean,
});



module.exports = mongoose.model("Round", roundSchema);
