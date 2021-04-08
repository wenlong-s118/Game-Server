var mongoose = require("mongoose");

var hostageSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  characterID: { type: mongoose.Schema.Types.ObjectId, ref: "Character"},
  hostage: String,
  onStageCoach: Boolean
});

module.exports= mongoose.model("Hostage", hostageSchema);
