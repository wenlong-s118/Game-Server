var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var roundSchema = new mongoose.Schema({
  cardsPlayed: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
      },
      character: String,
      card: String,

    },
  ],
  phases:[
    {phase: String,}
  ],

  roundType: String,
  stationRound: Boolean,

});



module.exports = mongoose.model("Round", roundSchema);
