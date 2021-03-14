var mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
  cartNumber: Number,
  loot: [{type: mongoose.Schema.Types.ObjectId,ref: 'Loot'}],
  horses: Number,
  marshal: Boolean,
  stagecoach: Boolean,
  charactersInCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character"}],
  charactersOnRoof: [{type: mongoose.Schema.Types.ObjectId,ref: "Character"}],
  shotgun: Boolean,
  number: Number,
});

module.exports= mongoose.model("Cart", cartSchema);
