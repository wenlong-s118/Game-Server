var mongoose = require("mongoose");

var carSchema = new mongoose.Schema({
  gameID: {type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  trainID: {type: mongoose.Schema.Types.ObjectId, ref: "Train"},
  carNumber: Number,
  horses: Number,
  marshal: Boolean,
  stagecoach: Boolean,
  shotgun: Boolean,
});

module.exports= mongoose.model("Car", carSchema);
