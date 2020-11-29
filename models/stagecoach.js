var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var StageCoachSchema = new mongoose.Schema({
  //playersInside[]
  //playersOnRoof[]
  //hostages[]

});


AddressSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Address", AddressSchema);
