var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
    gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
    horse: String,
    car: Number,
    onRoof: Boolean,
});

module.exports= mongoose.model("Character", characterSchema);
