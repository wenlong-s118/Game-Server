var mongoose = require("mongoose");

var shotgun = new mongoose.Schema({
  position: Number,
  ifPunched: Boolean,
});

module.exports= mongoose.model("Shotgun", shotgun);
