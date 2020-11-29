var mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
  //loot[]
  //int horses
  //bool marshal
  //bool stagecoach
  //charactersInCart[]
  //charactersOnRoof[]

});

module.exports= mongoose.model("Cart", cartSchema);
