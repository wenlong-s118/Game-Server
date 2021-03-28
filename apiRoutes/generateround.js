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
    })
})

// router.post("/generateRounds", function(req, res){
//     var gameID = mongoose.Types.ObjectId(req.body.gameID);
//     Game.findByID(gameID, function(err, foundGame){
//         var noChar = foundGame.noChar;
//         RoundGenerator.findOne({gameID:gameID}, function(err, foundRoundGenerator){
//           if(noChar>4 && nochar<=6){
//               for(i=0; i<4; i++){
//                   var index = Math.floor(Math.random() * 12);
//               }
//           }
//         })
//
//     })
//
// })


module.exports = router;
