var mongoose = require("mongoose");

var positionSchema = new mongoose.Schema({
  characterID: { type: mongoose.Schema.Types.ObjectId, ref: "Character"},
  stagecoach: Boolean,
  onRoof: Boolean,
  carID: { type: mongoose.Schema.Types.ObjectId, ref: "Car"}
});

module.exports= mongoose.model("Position", positionSchema);
