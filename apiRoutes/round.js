const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Round          = require("../models/round"),
      Loot           = require("../models/loot");

router.get("/actionStack", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Round.find({gameID:gameID}, 'cardsPlayed').lean().exec(function(err, characters){
        return res.send(JSON.stringify(characters));
    })
})
router.post("/actionStack", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var cardName = req.body.gameID;
    Card.find({card: cardName}, function(err, foundCard){
      Round.find({gameID:gameID}, function(err, foundRound){
          const actionStack = foundRound.cardsPlayed;
          
      })
    })

})


module.exports = router;
