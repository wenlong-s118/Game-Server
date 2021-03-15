var mongoose = require("mongoose");

var positionSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  stagecoach: Boolean,
  onRoof: Boolean,
  cart: Number,
});

module.exports= mongoose.model("Position", positionSchema);
