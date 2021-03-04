var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var stageCoachSchema = new mongoose.Schema({
  charactersInside:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character"
      },
      character: String,

    },
  ],
  characterssOnRoof:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character"
      },
      character: String,

    },
  ],
  hostages:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostage"
      },


    },
  ],

});



module.exports = mongoose.model("StageCoach", stageCoachSchema);
