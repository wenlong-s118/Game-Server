var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var gameSchema = new mongoose.Schema({
  characters:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character"
      },
      character: String,

    },
  ],
  sessionID: String,
  roundID: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Round"
      },
      character: String,

    },
  ],
  trainID:{
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Train"
      },
  },
  stagecoachID:{
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stagecoach"
      },
  },

});



module.exports = mongoose.model("Game", gameSchema);
