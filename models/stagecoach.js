var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var stageCoachSchema = new mongoose.Schema({
  charactersInside:[{type: mongoose.Schema.Types.ObjectId,ref: "Character"}],
  characterssOnRoof:[{type: mongoose.Schema.Types.ObjectId,ref: "Character"}],
  hostages:[{type: mongoose.Schema.Types.ObjectId,ref: "Hostage"}],
  shotgunPresent: Boolean,
  isStrongBoxDropped: Boolean
});


module.exports = mongoose.model("StageCoach", stageCoachSchema);
