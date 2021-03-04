var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  character: String,
  card: String,
});

module.exports= mongoose.model("Card", cardSchema);
