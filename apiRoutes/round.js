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

router.post("/endOfRound", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Game.findById(gameID, function(err, foundGame){
        foundGame.roundIndex++;
        foundGame.save();
    })
    Chracter.find({gameID:gameID}, function(err, foundCharacters){
        var lastIndex = foundCharacters.length - 1;
        foundCharacters.forEach(function(foundCharacter){
            if(foundCharacter.turnNumber==0){
                foundCharacter.turnNumber--;
            }else{
                foundCharacter.turnNumber = lastIndex;
            }
            foundCharacter.save();
        })

    })
    res.status(200).send('OK');
})

//currentRoundNumber
router.get("/currentRoundNumber/:gameID", function(req,res){
    //returns round number
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    //find game to get roundID: roundIndex, gameID
    Game.findById(gameID, function(err, foundGame){
        var roundIndex = foundGame.roundIndex;
        var roundNumber = {
            roundNumber: roundIndex
        };
        return res.send(JSON.stringify(roundNumber));

    })

})
//currentRoundType
router.get("/currentRound/:gameID", function(req,res){
    //returns roundType
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    //find game to get roundID: roundIndex, gameID
    Game.findById(gameID, function(err, foundGame){
        var roundIndex = foundGame.roundIndex;
        var turnIndex = foundGame.turnIndex;
        Round.findOne({gameID:gameID, roundNumber:roundIndex}, function(err, foundRound){
            //find round by gameID
            //return round type
            var roundType = {
                round: foundRound.roundType
            };
            return res.send(JSON.stringify(roundType));

        })
    })

})


module.exports = router;
