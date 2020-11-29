var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var GameSchema = new mongoose.Schema({
  //cardID cardsPlayed[]
  /*struct round{
    String phase[]
  }*/
  //String roundType
  //bool stationRound

});


AddressSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Address", AddressSchema);
