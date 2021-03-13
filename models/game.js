var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var gameSchema = new mongoose.Schema({
  characters:[type: mongoose.Schema.Types.ObjectId, ref: "User"],
  session: String,
  round: {type: mongoose.Schema.Types.ObjectId, ref: "Round"},
  train:{type: mongoose.Schema.Types.ObjectId,ref: "Train"},
  stagecoach:{type: mongoose.Schema.Types.ObjectId, ref: "Stagecoach"},
  phase: String,
  currentPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Character"}
}

});



module.exports = mongoose.model("Game", gameSchema);
