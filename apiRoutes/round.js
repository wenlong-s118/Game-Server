const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Character      = require("../models/character"),
      Card           = require("../models/card"),
      Train          = require("../models/train"),
      Round          = require("../models/round"),
      Loot           = require("../models/loot");


//old route soon deprecated
router.get("/actionStackOld/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Round.find({gameID:gameID}, 'cardsPlayed').lean().exec(function(err, cardsPlayed){
        return res.send(JSON.stringify(cardsPlayed));
    })

})
router.get("/actionStack/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Card.find({gameID:gameID, actionStack:true}).sort('order').exec(function(err, foundCards){
        var response = {
            cardsPlayed: foundCards
        };
        return res.send(JSON.stringify(response));
    })
})
//playAction deprecated
// router.post("/playAction", function(req,res){
//     var gameID = mongoose.Types.ObjectId(req.body.gameID);
//     var cardName = req.body.cardName;
//     var characterName = req.body.characterName;
//     Card.findOne({card: cardName, character:characterName}, function(err, foundCard){
//       console.log(foundCard);
//       Round.findOne({gameID:gameID}, function(err, foundRound){
//           console.log(foundRound);
//           console.log(foundRound.cardsPlayed);
//           const actionStack = foundRound.cardsPlayed;
//
//           var newCard = {
//               id: foundCard._id,
//               character: foundCard.character,
//               card: foundCard.card
//           }
//           actionStack.push(newCard);
//           foundCard.inHand = false;
//           foundCard.
//           foundCard.save();
//           foundRound.save();
//       })
//     })
//     res.status(200).send('OK');
//
//
// })
//end of round updated
router.post("/endOfRound", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Game.findById(gameID, function(err, foundGame){
        foundGame.roundIndex++;
        foundGame.save();
    })
    Character.find({gameID:gameID}, function(err, foundCharacters){
        var lastIndex = foundCharacters.length - 4;
        foundCharacters.forEach(function(foundCharacter){
            if(foundCharacter.turnNumber){
                if(foundCharacter.turnNumber==0){
                    foundCharacter.turnNumber = lastIndex;

                }else{
                    foundCharacter.turnNumber--;
                }
                foundCharacter.save();
            }

        })

    })
    Card.find({gameID:gameID, inHand:true}, function(err, foundCards){
        foundCards.forEach(function(foundCard){
            console.log(foundCard);
            foundCard.inHand = false;
            foundCard.inDeck = true;
            foundCard.save();
            console.log(foundCard);
        })
    })
    Card.find({gameID:gameID, actionStack:true}, function(err, foundCards){
        foundCards.forEach(function(foundCard){
            console.log(foundCard);
            foundCard.actionStack = false;
            foundCard.inDeck = true;
            foundCard.save();
            console.log(foundCard);
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
        var roundNumber = roundIndex;
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
            if(foundRound){
                //find round by gameID
                //return round type
                var roundType = foundRound.roundType;
                return res.send(JSON.stringify(roundType));
            }


        })
    })

})


module.exports = router;
