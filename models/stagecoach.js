var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var stageCoachSchema = new mongoose.Schema({
  gameID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  },
  car: Number
});


module.exports = mongoose.model("StageCoach", stageCoachSchema);
