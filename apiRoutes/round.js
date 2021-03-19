const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Card            = require("../models/card"),
      Train          = require("../models/train"),
      Round          = require("../models/round"),
      Loot           = require("../models/loot");

router.get("/actionStack/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Round.find({gameID:gameID}, 'cardsPlayed').lean().exec(function(err, cardsPlayed){
        return res.send(JSON.stringify(cardsPlayed));
    })
})
router.post("/playAction", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var cardName = req.body.cardName;
    var characterName = req.body.characterName;
    Card.findOne({card: cardName, character:characterName}, function(err, foundCard){
      console.log(foundCard);
      Round.findOne({gameID:gameID}, function(err, foundRound){
          console.log(foundRound);
          console.log(foundRound.cardsPlayed);
          const actionStack = foundRound.cardsPlayed;

          var newCard = {
              id: foundCard._id,
              character: foundCard.character,
              card: foundCard.card
          }
          actionStack.push(newCard);
          foundCard.inHand = false;
          foundCard.save();
          foundRound.save();
      })
    })
    res.status(200).send('OK');


})


module.exports = router;
