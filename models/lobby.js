var mongoose = require("mongoose");

var lobbySchema = new mongoose.Schema({
    noChar: Number,
    sessionID: String,
    characterSelectLock: Boolean,
    charactersAvailable: [String],
    orderIndex: Number
});

module.exports= mongoose.model("Lobby", lobbySchema);
