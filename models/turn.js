var mongoose = require("mongoose");

var turn = new mongoose.Schema({
    gameID: { type: mongoose.Schema.Types.ObjectId, ref: "Game"},
    turnType: String,
    playerIndex: Number,
    turnNumber: Number
});

module.exports= mongoose.model("Turn", turn);
