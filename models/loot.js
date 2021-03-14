var mongoose = require("mongoose");

var lootSchema = new mongoose.Schema({
  trainID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train"
  },
  amount: Number,
  type: String,


});

module.exports= mongoose.model("Loot", lootSchema);
