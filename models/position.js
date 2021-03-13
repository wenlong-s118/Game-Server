var mongoose = require("mongoose");

var positionSchema = new mongoose.Schema({
  stagecoach: Boolean,
  onRoof: Boolean,
  cart: Number,
});

module.exports= mongoose.model("Position", cartSchema);
