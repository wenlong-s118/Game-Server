var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var GameSchema = new mongoose.Schema({
  //character[]
  //sessionID
  //roundID rounds[]
  //trainID train
  //stagecoachID stagecoach
  //
});


AddressSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Address", AddressSchema);
