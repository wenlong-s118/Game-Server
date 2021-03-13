var mongoose = require("mongoose");

var turn = new mongoose.Schema({
  position: Number,
  ifPunched: Boolean,
});

module.exports= mongoose.model("Turn", turn);
