var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sessionID: String,
  character: String,
  lootamount: Number,
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
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },
  onRoof: Boolean,
  hostages: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostage"
      },

    }
  ],
  cardsInHand: card[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
      },
      card: String,
  ]

});

module.exports= mongoose.model("Character", characterSchema);
