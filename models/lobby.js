var mongoose = require("mongoose");

var lobbySchema = new mongoose.Schema({
    noChar: Number,
    sessionID: String,
    characterSelectLock: Boolean,
    charactersAvailable: [String],
});

module.exports= mongoose.model("Lobby", lobbySchema);
