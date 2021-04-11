const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      Car           = require("../models/car"),
      Character      = require("../models/character"),
      Game           = require("../models/game"),
      Loot           = require("../models/loot"),
      Round          = require("../models/round"),
      Train          = require("../models/train"),
      Turn           = require("../models/turn"),
      User           = require("../models/user"),
      Horse           = require("../models/horse"),
      Hostage          = require("../models/hostage"),
      StageCoach     = require("../models/stagecoach");


//EOR shoot
router.post("/specialShoot", function(req,res){
  //req parameters
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var victimName = req.body.victimName;
    var realAgressorName="Neutral"

    Character.findOne({gameID: gameID, character:realAgressorName}, function(err, foundAgressor){
        Character.findOne({gameID: gameID, character:victimName}, function(err, foundVictim){
            Card.findOne({characterID: foundAgressor._id, isBullet:true}, function(err, foundCard){
                if(foundCard){
                    foundCard.characterID = foundVictim._id;
                    foundCard.isHostile = true;
                    foundCard.save();

                    res.status(200).send('OK');
                }
                else{
                  res.status(500).send("No bullets left!");
                }


            })
        })
    })


})

router.post("/moveHorseAtCar", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var oldCarNumber = req.body.oldCarNumber;
    var newCarNumber = req.body.newCarNumber;

    Horse.findOne({gameID: gameID, car:oldCarNumber}, function(err, foundHorse){

        foundHorse.car = newCarNumber;
        foundHorse.save();
        res.status(200).send('OK');

    })


})
router.post("/removeHorseAtCar", function(req,res){
  var gameID = mongoose.Types.ObjectId(req.body.gameID);
  var carNumber = req.body.carNumber;
  Horse.findOneAndRemove({gameID: gameID, car:carNumber}, function(err){
      console.log(err);
      res.status(200).send('OK');
  })
})
module.exports = router;
