const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Card            = require("../models/card"),
      Train          = require("../models/train"),
      Round          = require("../models/round"),
      Loot           = require("../models/loot"),
      RoundGenerator = require("../models/roundgenerator")

router.post("/initializeGenerator", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var roundsAvailableTwoToFour = [
        "AngryMarshalTwoToFour",
        "SwivelArmTwoToFour",
        "BrakingTwoToFour",
        "TakeItAllTwoToFour",
        "RebellionTwoToFour",
        "NormalOneTwoToFour",
        "NormalTwoTwoToFour",
        "NormalThreeTwoToFour",
        "PantingHorsesTwoToFour",
        "WhiskyMarshalTwoToFour",
        "HigherSpeedTwoToFour",
        "ShotgunRageTwoToFour"
    ];
    var roundsAvailableFiveToSix = [
        "AngryMarshalFiveToSix",
        "SwivelArmFiveToSix",
        "BrakingFiveToSix",
        "TakeItAllFiveToSix",
        "RebellionFiveToSix",
        "NormalOneFiveToSix",
        "NormalTwoFiveToSix",
        "NormalThreeFiveToSix",
        "PantingHorsesFiveToSix",
        "WhiskyMarshalFiveToSix",
        "HigherSpeedFiveToSix",
        "ShotgunRageFiveToSix"
    ];
    var stationsAvailable = [
        "MarshalsRevenge",
        "Pickpocketing",
        "HostageConductor",
        "SharingLoot",
        "Escape",
        "MortalBullet"
    ];
    var newRoundGenerator = {
        gameID: gameID,
        roundsAvailableTwoToFour: roundsAvailableTwoToFour,
        roundsAvailableFiveToSix: roundsAvailableFiveToSix,
        stationsAvailable: stationsAvailable
    }
    RoundGenerator.create(newRoundGenerator, function(err, roundGenerator){
        if (err){
            console.log(err);
        }
        res.status(200).send('OK');
    })

})

router.post("/generateRounds", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Game.findById(gameID, function(err, foundGame){
        if(foundGame){
            var noChar = foundGame.noChar;
            RoundGenerator.findOne({gameID:gameID}, function(err, foundRoundGenerator){
                if(noChar>=2 && noChar<=4){
                    var length = 12;
                    for(i=0; i<4; i++){
                        var index = Math.floor(Math.random() * foundRoundGenerator.roundsAvailableTwoToFour.length);
                        var roundType = foundRoundGenerator.roundsAvailableTwoToFour[index];
                        foundRoundGenerator.roundsAvailableTwoToFour.splice(index,1);
                        var newRound = {
                            gameID: gameID,
                            roundType: roundType,
                            roundNumber: i
                        }
                        Round.create(newRound, function(err, round){
                            if (err){
                                console.log(err);
                            }
                            res.status(200).send('OK');
                        })
                    }
                }
                if(noChar>4 && noChar<=6){

                    for(i=0; i<4; i++){

                        var index = Math.floor(Math.random() * foundRoundGenerator.roundsAvailableFiveToSix.length);
                        var roundType = foundRoundGenerator.roundsAvailableFiveToSix[index];
                        foundRoundGenerator.roundsAvailableFiveToSix.splice(index,1);
                        var newRound = {
                            gameID: gameID,
                            roundType: roundType,
                            roundNumber: i
                        }
                        Round.create(newRound, function(err, round){
                            if (err){
                                console.log(err);
                            }
                            res.status(200).send('OK');
                        })
                    }
                }
                var index = Math.floor(Math.random() * foundRoundGenerator.stationsAvailable.length);
                var stationType = foundRoundGenerator.stationsAvailable[index];
                foundRoundGenerator.stationsAvailable.splice(index,1);
                var newStation = {
                    gameID: gameID,
                    roundType: stationType,
                    roundNumber: 4
                }
                Round.create(newStation, function(err, station){
                    if (err){
                        console.log(err);
                    }
                })
                foundRoundGenerator.save();
            })
        }


    })

})


module.exports = router;
