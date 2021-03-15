var mongoose = require("mongoose");

var trainSchema = new mongoose.Schema({
  gameID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  },
  carCount: Number,

});

module.exports= mongoose.model("Train", trainSchema);
