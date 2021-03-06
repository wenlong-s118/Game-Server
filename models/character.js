var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
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
    ref: "Position"
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
  cardsInHand: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
      },
      card: String,
    }
  ],
  inTurn: Boolean,
  turnNumber: Number, 
  finishedTurn: Boolean,
});

module.exports= mongoose.model("Character", characterSchema);
