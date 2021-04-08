var mongoose = require("mongoose");

var hostageGeneratorSchema = new mongoose.Schema({
    gameID: {type: mongoose.Schema.Types.ObjectId, ref: "Game"},
    hostagesAvailable: [String]
});

module.exports= mongoose.model("HostageGenerator", hostageGeneratorSchema);
