var mongoose = require("mongoose");

var turn = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  position: Number,
  ifPunched: Boolean,
});

module.exports= mongoose.model("Turn", turn);
