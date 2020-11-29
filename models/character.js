var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
  //userID
  //sessionID
  //string character
  //int lootamount
  //loot[]
  //position
  //hostageID hostages[]
  //cardsInHand card[]

});

module.exports= mongoose.model("Cart", cartSchema);
