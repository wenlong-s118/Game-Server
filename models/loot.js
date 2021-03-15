var mongoose = require("mongoose");

var lootSchema = new mongoose.Schema({
  gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  trainID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train"
  },
  carID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },
  playerID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },
  amount: Number,
  type: String,


});

module.exports= mongoose.model("Loot", lootSchema);
