const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      Car           = require("../models/car"),
      Character      = require("../models/character"),
      Game           = require("../models/game"),
      Loot           = require("../models/loot"),
      Marshal        = require("../models/marshal"),
      Position       = require("../models/position"),
      Round          = require("../models/round"),
      Train          = require("../models/train"),
      Turn           = require("../models/turn"),
      User           = require("../models/user");

//punch
router.post("/punch", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who gets punched
    var victimID = mongoose.Types.ObjectId(req.body.victimID);
    Character.findById(victimID, function(err, foundCharacter){
        Loot.findOne({characterID:victimID}, function(err, foundLoot){
            foundLoot.characterID = null;
            Car.findOne({gameID:gameID, carNumber=foundCharacter.car}, function(err,foundCar){
                foundLoot.carID = foundCar._id;
            })
            foundCharacter.lootamount-=foundLoot.amount;
            foundCharacter.save();
            foundLoot.save();
        })
    })


});
//steal
router.post("/steal", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who gets punched
    var characterID = mongoose.Types.ObjectId(req.body.victimID);
    Character.findById(victimID, function(err, foundCharacter){
        Loot.findOne({characterID:victimID}, function(err, foundLoot){
            foundLoot.characterID = null;
            Car.findOne({gameID:gameID, carNumber=foundCharacter.car}, function(err,foundCar){
                foundLoot.carID = foundCar._id;
            })
            foundCharacter.lootamount-=foundLoot.amount;
            foundCharacter.save();
            foundLoot.save();
        })
    })


});
//shoot
//changeFloor
//move

module.exports = router;