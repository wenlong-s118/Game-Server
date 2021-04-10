var mongoose = require("mongoose");

var lootSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  carID: {type: mongoose.Schema.Types.ObjectId, ref: "Car"},
  characterID:{type: mongoose.Schema.Types.ObjectId, ref: "Character"},
  amount: Number,
  type: String,
  car: Number,
  onRoof: Boolean,
  onStageCoach: Boolean,
  halfDrunk: Boolean,
  isFull: Boolean
});

module.exports= mongoose.model("Loot", lootSchema);
