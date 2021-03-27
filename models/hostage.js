var mongoose = require("mongoose");

var hostageSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  characterID: { type: mongoose.Schema.Types.ObjectId, ref: "Character"},
  name: String,
});

module.exports= mongoose.model("Hostage", hostageSchema);
