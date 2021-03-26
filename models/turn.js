var mongoose = require("mongoose");

var turn = new mongoose.Schema({
    gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
    roundID:{ type: mongoose.Schema.Types.ObjectId, ref: "Round"},
    turnType: String,
    turnNumber: Number
});

module.exports= mongoose.model("Turn", turn);
