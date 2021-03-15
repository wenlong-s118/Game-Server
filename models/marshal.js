var mongoose = require("mongoose");

var marshalSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  position: Number,
  bulletsRemaining: Number,
});

module.exports= mongoose.model("Marshal", marshalSchema);
