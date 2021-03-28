var mongoose = require("mongoose");

var roundGeneratorSchema = new mongoose.Schema({
    gameID: {type: mongoose.Schema.Types.ObjectId, ref: "Game"},
    roundsAvailableTwoToFour: [String],
    roundsAvailableFiveToSix: [String],
    stationsAvailable: [String]
});

module.exports= mongoose.model("RoundGenerator", roundGeneratorSchema);
