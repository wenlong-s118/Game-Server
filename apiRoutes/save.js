const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      User           = require("../models/user"),
      Character      = require("../models/character"),
      Horse          = require("../models/horse"),
      Card           = require("../models/card");

router.post("/save/:gameID/:username", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Round.find({gameID:gameID}, 'cardsPlayed').lean().exec(function(err, cardsPlayed){
        return res.send(JSON.stringify(cardsPlayed));
    })
})
router.get("/allSavedGames/:username", function(req,res){

})

router.post("/load/:userName/:gameID/:currentSessionID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Round.find({gameID:gameID}, 'cardsPlayed').lean().exec(function(err, cardsPlayed){
        return res.send(JSON.stringify(cardsPlayed));
    })
})


module.exports = router;
