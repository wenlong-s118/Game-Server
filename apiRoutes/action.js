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
      StageCoach     = require("../models/stagecoach");



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
//Three cards change to inHand true, inDeck false
router.post("/draw", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var characterName = req.body.characterName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        var cards = Card.find({characterID: foundCharacter._id, inDeck: true}).limit(3).exec(function(err, foundCards){
            foundCards.forEach(function(foundCard){
                foundCard.inDeck = false;
                foundCard.inHand = true;
                foundCard.save();
            })
        });
    })
    res.status(200).send('OK');
})

router.post("/playActionCard", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var characterName = req.body.characterName;
    var cardName = req.body.cardName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        Card.findOne({characterID: foundCharacter._id, inHand: true, card:cardName}, function(err, foundCard){
            foundCard.inHand= false;
            foundCard.actionStack = true;
            foundCard.save();
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
                foundRound.save();
            })
        })
    })
    res.status(200).send('OK');
})
//updateWhisky:
router.post("/updateWhisky", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var characterName = req.body.characterName;
    var whiskyType = req.body.whiskyType;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        Loot.findOne({characterID:foundCharacter._id, type:whiskyType}, function(err, foundLoot){
            if(foundLoot.halfDrunk==true){
                console.log("haha");
                Loot.findByIdAndRemove(foundLoot._id).exec();
            }
            else{
                foundLoot.halfDrunk = true;
                foundLoot.save();
            }

        })
    })
    res.status(200).send('OK');
})

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
        Loot.findOne({characterID:foundVictim._id, type:lootType, amount:lootAmount}, function(err, foundLoot){
            Car.findOne({gameID:gameID, carNumber:foundVictim.car}, function(err,foundCar){
                if(agressorName === "Cheyenne"){
                    Character.findOne({gameID:gameID, character:agressorName}, function(err, foundAgressor){
                        console.log(foundAgressor)
                        foundLoot.characterID = foundAgressor._id;
                        foundLoot.save();

                    })
                }
                else{
                    foundLoot.characterID = null;
                    foundLoot.carID = foundCar._id;
                    foundLoot.car = foundVictim.car;
                    foundLoot.onRoof = foundVictim.onRoof
                    foundLoot.save();

                }

            })
            if(victimName === "Shotgun" && foundLoot.type === "Strongbox"){
                foundVictim.onStageCoach = false;
                foundLoot.onStageCoach = true;
                foundLoot.onRoof = true;
            }
            foundVictim.car = newCar;
            foundVictim.lootamount-=foundLoot.amount;
            foundVictim.save();
            res.status(200).send('OK');
        })
    })
});

//steal
router.post("/steal", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who steals
    var thiefName = req.body.thiefName;
    var lootType = req.body.lootType;
    var lootAmount = req.body.lootAmount
    Character.findOne({character:thiefName, gameID:gameID}, function(err, foundCharacter){
        console.log(foundCharacter);
        Loot.findOne({type:lootType, amount:lootAmount, gameID:gameID}, function(err, foundLoot){
            console.log(foundLoot);
            foundLoot.characterID = foundCharacter._id;
            foundLoot.carID = null;
            foundLoot.car = null;
            foundCharacter.lootamount=foundCharacter.lootamount+foundLoot.amount;
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
        foundCard.isHostile = true;
        res.status(200).send('OK');
    })

})

router.post("/shootByName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var agressorName = req.body.agressorName;
    var victimName = req.body.victimName;
    Character.findOne({gameID: gameID, character:agressorName}, function(err, foundAgressor){
        Character.findOne({gameID: gameID, character:victimName}, function(err, foundVictim){
            Card.findOne({characterID: foundAgressor._id, isBullet:true}, function(err, foundCard){
                if(agressorName==="Marshal"){
                    foundVictim.onRoof = true;
                    foundVictim.save();
                }
                if(agressorName==="Shotgun"){
                    StageCoach.findOne({gameID:gameID}, function(err, foundStageCoach){
                        foundVictim.car = foundStageCoach.car;
                        foundVictim.save();
                    })

                }
                foundCard.characterID = foundVictim._id;
                foundCard.isHostile = true;
                foundCard.save();

                res.status(200).send('OK');
            })
        })
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
    Character.findOne({gameID: gameID, character:characterName}, function(err, foundCharacter){
        if(err){
          console.log(err);
        }
        foundCharacter.car = carNumber;
        foundCharacter.onRoof = onRoof;
        foundCharacter.save();
        res.status(200).send('OK');
    })

})
//ride horse: also for stage coach access

module.exports = router;
