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
      User           = require("../models/user");


//board train: horse attack
router.post("/board", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var carNumber = req.body.carNumber;
    var characterName = req.body.characterName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        foundCharacter.car = carNumber;
        foundCharacter.onRoof = false;
        foundCharacter.save();
        res.status(200).send('OK');
    })
})
//draw

//useWhisky

//punch
//original punch route is deprecated...
router.post("/punchByID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //can choose loot
    //character who gets punched
    //agressorID
    var victimID = mongoose.Types.ObjectId(req.body.victimID);
    Character.findById(victimID, function(err, foundCharacter){
        Loot.findOne({characterID:victimID}, function(err, foundLoot){
            foundLoot.characterID = null;
            Car.findOne({gameID:gameID, carNumber:foundCharacter.car}, function(err,foundCar){
                foundLoot.carID = foundCar._id;
            })
            foundCharacter.lootamount-=foundLoot.amount;
            foundCharacter.save();
            foundLoot.save();
            res.status(200).send('OK');
        })
    })
});

router.post("/punchByName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var agressorName = req.body.agressorName;
    var victimName = req.body.victimName;
    var lootType = req.body.lootType;
    var lootAmount = req.body.lootAmount;
    var newCar = req.body.newCar;
    Character.findOne({gameID:gameID, character:victimName}, function(err, foundVictim){
        Loot.findOne({characterID:foundVictim._id,}, function(err, foundLoot){
            foundLoot.characterID = null;
            Car.findOne({gameID:gameID, carNumber:foundVictim.car}, function(err,foundCar){
                if(agressorName === "Cheyenne"){
                    Character.findOne({gameID:gameID, character:agressorName}, function(err, foundAgressor){
                        foundLoot.characterID = foundAgressor._id;
                    })
                }
                else{
                    foundLoot.carID = foundCar._id;
                    foundLoot.car = foundVictim.car;
                    foundLoot.onRoof = foundVictim.onRoof
                }

            })
            if(victimName === "Shotgun" && foundLoot.type === "Strongbox"){
                foundVictim.onStageCoach = false;
                foundLoot.onStageCoach = true;
            }
            foundVictim.car = newCar;
            foundVictim.lootamount-=foundLoot.amount;
            foundVictim.save();
            foundLoot.save();
            res.status(200).send('OK');
        })
    })
});

//steal
router.post("/steal", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who steals
    var thiefID = mongoose.Types.ObjectId(req.body.thiefID);
    var lootName = req.body.lootName;
    Character.findById(thiefID, function(err, foundCharacter){
        Loot.findOne({type:lootName}, function(err, foundLoot){
            foundLoot.characterID = foundCharacter._id;
            foundLoot.trainID = null;
            foundCharacter.lootamount+=foundLoot.amount;
            foundCharacter.save();
            foundLoot.save();
            res.status(200).send('OK');
        })
    })


});
//shoot: need to update
router.post("/shoot", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who shoots
    var agressorID = mongoose.Types.ObjectId(req.body.agressorID);
    //character who gets shot
    var victimID = mongoose.Types.ObjectId(req.body.victimID);

    Card.findOne({characterID: agressorID, isBullet:true}, function(err, foundCard){
        foundCard.characterID = victimID;
        foundCard.inHand = true;
        res.status(200).send('OK');
    })

})
//generalMovement
router.post("/generalMovement", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who moves
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    var carNo = req.body.carNo;
    var onRoof = req.body.onRoof;
    Character.findById(characterID, function(err, foundCharacter){
        foundCharacter.car = carNo;
        foundCharacter.onRoof = onRoof;
        foundCharacter.save();
        res.status(200).send('OK');
    })

})
router.post("/generalMovementByName", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who moves
    var characterName = req.body.characterName;
    var carNumber = req.body.carNumber;
    var onRoof = req.body.onRoof;
    Character.findOne({gameID: gameID, characterName:characterName}, function(err, foundCharacter){
        foundCharacter.car = carNo;
        foundCharacter.onRoof = onRoof;
        foundCharacter.save();
        res.status(200).send('OK');
    })

})
//ride horse: also for stage coach access

module.exports = router;
