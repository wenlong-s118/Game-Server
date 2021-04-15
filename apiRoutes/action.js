const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      random         = require("mongoose-simple-random");
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


//

//board train: horse attack
router.post("/board", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var carNumber = req.body.carNumber;
    var characterName = req.body.characterName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        foundCharacter.car = carNumber;
        foundCharacter.onRoof = false;
        foundCharacter.boarded = true;
        foundCharacter.save();
        res.status(200).send('OK');
    })
})

//board horse extension:
router.post("/boardHorseExtension", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var carNumber = req.body.carNumber;
    var characterName = req.body.characterName;
    var concatenator = "JR";
    var horseName = characterName.concat(concatenator);

    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        Horse.findOne({gameID:gameID, horse:horseName}, function(err, foundHorse){
            foundHorse.car = carNumber

            foundCharacter.car = carNumber;
            foundCharacter.onRoof = false;
            foundCharacter.boarded = true;
            foundCharacter.save();
            foundHorse.save();
            res.status(200).send('OK');
        })
    })
})
//draw
//draw Init
router.post("/drawInitial", async function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var characterName = req.body.characterName;
    await Character.findOne({gameID:gameID, character:characterName}, async function(err, foundCharacter){
        if(foundCharacter){
            console.log(foundCharacter);
            if(foundCharacter.character==="Doc"){
                await Card.findRandom({characterID: foundCharacter._id, inDeck: true},{},{limit:7}, function(err, foundCards){

                    foundCards.forEach(function(foundCard){
                        foundCard.inDeck = false;
                        foundCard.inHand = true;
                        foundCard.save();

                    })
                    res.status(200).send('OK');
                });
            }else{
                await Card.findRandom({characterID: foundCharacter._id, inDeck: true},{},{limit:6},function(err, foundCards){
                    foundCards.forEach(function(foundCard){
                        foundCard.inDeck = false;
                        foundCard.inHand = true;
                        foundCard.save();

                    })
                    res.status(200).send('OK');
                });
            }

        }
        else{

            res.status(500).send("/drawInitial:Character not found");

        }

    })

})
//Three cards change to inHand true, inDeck false
router.post("/draw", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var characterName = req.body.characterName;
    console.log("/draw: "+ characterName + ", " + gameID);
    Character.findOne({gameID:gameID, character:characterName}, async function(err, foundCharacter){
        if(foundCharacter){
          await Card.findRandom({characterID: foundCharacter._id, inDeck: true},{},{limit:3}, function(err, foundCards){

              foundCards.forEach(function(foundCard){
                  foundCard.inDeck = false;
                  foundCard.inHand = true;
                  foundCard.save();

              })
              res.status(200).send('OK');
          });

        }else{
          res.status(500).send("/draw:Character not found");
        }

    })

})
//play action card
//old route soon deprecated
router.post("/playActionCardOld", function(req,res){
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
                    cardID: foundCard._id,
                    card: foundCard.card
                }
                actionStack.push(newCard);
                foundRound.save();
            })
        })
    })
    res.status(200).send('OK');
})
router.post("/playActionCard", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var characterName = req.body.characterName;
    var cardName = req.body.cardName;
    Game.findById(gameID,function(err, foundGame){
        if(foundGame){
            Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
                if(foundCharacter){
                    Card.findOne({characterID: foundCharacter._id, inHand: true, card:cardName}, function(err, foundCard){
                        foundCard.inHand= false;
                        foundCard.actionStack = true;
                        foundCard.order = foundGame.cardInStackIndex;
                        foundCard.save();
                        foundGame.cardInStackIndex++;
                        foundGame.save();
                        res.status(200).send('OK');
                    })
                }
                else{
                    console.log("character not there");
                    res.status(500).send('character not there');
                }

            })

        }else{
            console.log("Game not there");
            res.status(500).send('Game not there');
        }

    })


})

//updateWhisky:
router.post("/updateWhisky", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var characterName = req.body.characterName;
    var whiskyType = req.body.whiskyType;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        if(foundLoot){
            Loot.findOne({characterID:foundCharacter._id, type:whiskyType}, function(err, foundLoot){
                if(foundLoot){
                    if(foundLoot.halfDrunk==true){
                        console.log("haha");
                        Loot.findByIdAndRemove(foundLoot._id).exec();
                    }
                    else{
                        foundLoot.halfDrunk = true;
                        foundLoot.isFull = false;
                        foundLoot.save();
                    }
                    res.status(200).send('OK');
                }else{
                    console.log("/updateWhisky: Loot not there");
                    res.status(500).send('/updateWhisky: Loot not there');
                }
            })
          }
          else{
              console.log("/updateWhisky: Character not there");
              res.status(500).send('/updateWhisky: Character not there');
          }
    })

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
        if(foundCharacter){
            Loot.findOne({characterID:victimID}, function(err, foundLoot){
                if(foundLoot){
                    foundLoot.characterID = null;
                    Car.findOne({gameID:gameID, carNumber:foundCharacter.car}, function(err,foundCar){
                        foundLoot.carID = foundCar._id;
                    })
                    foundCharacter.lootamount-=foundLoot.amount;
                    foundCharacter.save();
                    foundLoot.save();
                    res.status(200).send('OK');
                }else{
                    console.log("/punchByID: Loot not there");
                    res.status(500).send('/punchByID: Loot not there');
                }

            })
        }
        else{
            console.log("/punchByID: Character not there");
            res.status(500).send('/punchByID: Character not there');
        }

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
        console.log(lootType);
        console.log(lootAmount);
        Loot.findOne({type:lootType, amount:lootAmount, car: foundCharacter.car, gameID:gameID}, function(err, foundLoot){
          if(err){
            console.log(lootType);
            console.log(lootAmount);
          }
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

router.post("/kidnap", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who steals
    var kidnapperName = req.body.kidnapperName;
    var hostageName = req.body.hostageName;
    Character.findOne({character:kidnapperName, gameID:gameID}, function(err, foundCharacter){
        console.log(foundCharacter);
        Hostage.findOne({hostage:hostageName, onStageCoach:true, gameID:gameID}, function(err, foundHostage){
            console.log(foundHostage);
            foundHostage.characterID = foundCharacter._id;
            foundHostage.onStageCoach = false;
            foundHostage.save();
            res.status(200).send('OK');
        })
    })


});

router.post("/drop", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var victimName = req.body.victimName;
    var lootType = req.body.lootType;
    var lootAmount = req.body.lootAmount;
    var newCar = req.body.newCar;
    Character.findOne({gameID:gameID, character:victimName}, function(err, foundVictim){
        Loot.findOne({characterID:foundVictim._id, type:lootType, amount:lootAmount}, function(err, foundLoot){
            Car.findOne({gameID:gameID, carNumber:foundVictim.car}, function(err,foundCar){
                foundLoot.characterID = null;
                foundLoot.carID = foundCar._id;
                foundLoot.car = foundVictim.car;
                foundLoot.onRoof = foundVictim.onRoof
                foundLoot.save();
            })

            foundVictim.car = newCar;
            foundVictim.lootamount-=foundLoot.amount;
            foundVictim.save();
            res.status(200).send('OK');
        })
    })
});
router.post("/spawnStrongBox", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var carNo = req.body.carNo;
    var amount= 1000;
    var type= "Strongbox";
    var newStrongbox = {
        gameID: gameID,
        car: carNo,
        amount: amount,
        type: type,
    }
    Loot.create(newStrongbox, function(err, strongbox){
        if (err){
            console.log(err);
        }

        console.log(strongbox);
        res.status(200).send('OK');
    })
})
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
//deprecated route: neutral bullets meant to be shared...
// router.post("/shootByNameOld", function(req,res){
//     var gameID = mongoose.Types.ObjectId(req.body.gameID);
//     var agressorName = req.body.agressorName;
//     var victimName = req.body.victimName;
//     Character.findOne({gameID: gameID, character:agressorName}, function(err, foundAgressor){
//         Character.findOne({gameID: gameID, character:victimName}, function(err, foundVictim){
//             Card.findOne({characterID: foundAgressor._id, isBullet:true}, function(err, foundCard){
//                 if(agressorName==="Marshal"){
//                     foundVictim.onRoof = true;
//                     foundVictim.save();
//                 }
//                 if(agressorName==="Shotgun"){
//                     StageCoach.findOne({gameID:gameID}, function(err, foundStageCoach){
//                         foundVictim.car = foundStageCoach.car;
//                         foundVictim.save();
//                     })
//
//                 }
//                 foundCard.characterID = foundVictim._id;
//                 foundCard.isHostile = true;
//                 foundCard.save();
//
//                 res.status(200).send('OK');
//             })
//         })
//     })
//
//
// })

router.post("/shootByName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var agressorName = req.body.agressorName;
    var victimName = req.body.victimName;
    var realAgressorName;
    if(agressorName==="Marshal"|| agressorName==="Shotgun"){
      realAgressorName="Neutral"
    }
    else{
      realAgressorName=agressorName;
    }
    Character.findOne({gameID: gameID, character:realAgressorName}, function(err, foundAgressor){
        Character.findOne({gameID: gameID, character:victimName}, function(err, foundVictim){
            if(foundVictim&&foundAgressor){
                Card.findOne({characterID: foundAgressor._id, isBullet:true}, function(err, foundCard){
                    if(foundCard){
                        if(agressorName==="Marshal"){
                            foundVictim.onRoof = true;
                            foundVictim.save();
                        }
                        if(agressorName==="Shotgun"){
                            StageCoach.findOne({gameID:gameID}, function(err, foundStageCoach){
                                if(foundVictim.car==0){
                                    foundVictim.car++;
                                    foundVictim.save();
                                }
                                else{
                                    foundVictim.car--;
                                    foundVictim.save();
                                }


                            })

                        }
                        foundCard.characterID = foundVictim._id;
                        foundCard.isHostile = true;
                        foundCard.save();

                        res.status(200).send('OK');
                    }
                    else{
                      res.status(500).send("/shootByName: No bullets left!");
                    }


                })
            }else{
                console.log("/shootByName: Horse not there");
                res.status(500).send('/shootByName: Horse not there');
            }

        })
    })


})

//generalMovement: Deprecated
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
    var onStageCoach = req.body.onStageCoach;
    Character.findOne({gameID: gameID, character:characterName}, function(err, foundCharacter){

        if(err){
          console.log(err);
        }

        if(onStageCoach){
          foundCharacter.onStageCoach = true;
          foundCharacter.car = null;
          foundCharacter.onRoof = onRoof;
          foundCharacter.save();
          res.status(200).send('OK');
        }else{
          foundCharacter.car = carNumber;
          foundCharacter.onRoof = onRoof;
          foundCharacter.save();
          res.status(200).send('OK');
        }

    })

})
//ride horse: also for stage coach access
router.post("/rideHorse", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //character who moves
    var characterName = req.body.characterName;
    var horseName = req.body.horseName;
    var carNumber = req.body.carNumber;
    var onRoof = req.body.onRoof;
    var onStageCoach = req.body.onStageCoach;
    Character.findOne({gameID: gameID, character:characterName}, function(err, foundCharacter){
        if(foundCharacter){
            Horse.findOne({gameID: gameID, horse:horseName}, function(err, foundHorse){
                if(foundHorse){
                    if(err){
                      console.log(err);
                    }

                    if(onStageCoach){
                      foundCharacter.onStageCoach = true;
                      foundCharacter.car = null;
                      foundCharacter.onRoof = onRoof;
                      foundCharacter.save();
                      foundHorse.onStageCoach = true;
                      foundHorse.car = null;
                      foundHorse.save();
                      res.status(200).send('OK');
                    }else{
                      foundCharacter.car = carNumber;
                      foundCharacter.onRoof = onRoof;
                      foundCharacter.save();
                      foundHorse.car = carNumber;
                      foundHorse.save();
                      res.status(200).send('OK');
                    }
                }else{
                    console.log("/rideHorse: Horse not there");
                    res.status(500).send('/rideHorse: Horse not there');
                }

            })
        }else{
            console.log("/rideHorse: Character not there");
            res.status(500).send('/rideHorse: Character not there');
        }

    })

})
module.exports = router;
