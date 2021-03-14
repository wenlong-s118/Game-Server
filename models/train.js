var mongoose = require("mongoose");

var trainSchema = new mongoose.Schema({
  gameID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  },
  carts:[{type: mongoose.Schema.Types.ObjectId,ref: "Cart"}]
});

module.exports= mongoose.model("Train", trainSchema);
