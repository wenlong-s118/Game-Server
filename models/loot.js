var mongoose = require("mongoose");

var lootSchema = new mongoose.Schema({
  amount: Number,
  type: String,


});

module.exports= mongoose.model("Loot", lootSchema);
