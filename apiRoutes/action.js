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


//board train
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

//punch
router.post("/punch", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who gets punched
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

//steal
router.post("/steal", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who gets punched
    var thiefID = mongoose.Types.ObjectId(req.body.thiefID);
    var lootName = req.body.lootName;
    Character.findById(thiefID, function(err, foundCharacter){
        Loot.findOne({type:lootName}, function(err, foundLoot){
            foundLoot.characterID = foundCharacter._id;
            foundLoot.trainID = null;
            foundCharacter.lootamount+=foundLoot.amount;
            foundCharacter.save();
            foundLoot.save();
        })
    })


});
//shoot
router.post("/shoot", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who shoots
    var agressorID = mongoose.Types.ObjectId(req.body.agressorID);
    //character who gets shot
    var victimID = mongoose.Types.ObjectId(req.body.victimID);

    Card.findOne({characterID: agressorID, isBullet:true}, function(err, foundCard){
        foundCard.characterID = victimID;
        foundCard.inHand = true;
    })

})
//generalMovement
router.post("/generalMovement", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who shoots
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    var carNo = req.body.carNo;
    var onRoof = req.body.onRoof;
    Character.findById(characterID, function(err, foundCharacter){
        foundCharacter.car = carNo;
        foundCharacter.onRoof = onRoof;
        foundCharacter.save();
    })

})


module.exports = router;
