var mongoose = require("mongoose");

var horseSchema = new mongoose.Schema({
    gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
    horse: String,
    car: Number,
    onStageCoach: Boolean
});

module.exports= mongoose.model("Horse", horseSchema);
