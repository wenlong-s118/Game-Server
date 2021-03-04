var mongoose = require("mongoose");

var marshallSchema = new mongoose.Schema({
  position: Number,


});

module.exports= mongoose.model("Marshal", marshalSchema);
