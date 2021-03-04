var mongoose = require("mongoose");

var hostageSchema = new mongoose.Schema({
  cart: Number,
  name: String,
});

module.exports= mongoose.model("Hostage", hostageSchema);
