var mongoose = require("mongoose");

var hostageSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  cart: Number,
  name: String,
});

module.exports= mongoose.model("Hostage", hostageSchema);
