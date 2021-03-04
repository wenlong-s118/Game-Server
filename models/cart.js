var mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  loot: [
    {
      id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loot'
      },
      amount: Number,
      type: String,
    }
  ],
  horses: Number,
  marshal: Boolean,
  stagecoach: Boolean,
  charactersInCart: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character"
      },
      character: String,

    },
  ],
  charactersOnRoof: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character"
      },
      character: String,

    },
  ],

});

module.exports= mongoose.model("Cart", cartSchema);
