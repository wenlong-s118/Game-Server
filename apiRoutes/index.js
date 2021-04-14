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
      StageCoach     = require("../models/stagecoach"),
      Turn           = require("../models/turn"),
      User           = require("../models/user");

router.post("/initializeGame", async function(req,res){
    var sessionID = req.body.sessionID;
    var noChar = req.body.noChar;
    // var round: {type: mongoose.Schema.Types.ObjectId, ref: "Round"};
    // var phase: "";
    // var currentPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Character"};
    var newGame = {sessionID: sessionID, noChar:noChar, roundIndex: 0,turnIndex: 0, playerIndex: 0, cardInStackIndex:0, isStealin:false};

    await Game.create(newGame, function(err, game){
        if (err) {
            console.log(err);
            res.redirect("/");
        }
        console.log(game._id);
        var gameID = game._id;
        var cardsPlayed = [];
        // var newRound = {
        //   gameID : gameID,
        //   roundType: 'normal',
        //   turnsInRound: 4,
        //   cardIsFaceUp: true,
        //   cardsPlayed:cardsPlayed,
        //   phase: 'scheming',
        // };
        //
        // Round.create(newRound, function(err, round){
        //   if (err){
        //       console.log(err);
        //   }
        // });
        var newNeutral = {
            gameID: game._id,
            character: "Neutral",
            invisible: true
        }
        Character.create(newNeutral, function(err, neutral){
            if (err){
                console.log(err);
            }
            for(i=0; i< 16; i++){
              var card = "Bullet";
              var newCard = {
                  gameID: game._id,
                  characterID: neutral._id,
                  character: "Neutral",
                  card: card,
                  isBullet: true,
              }
              Card.create(newCard, function(err, card){
                  if (err){
                      console.log(err);
                  }
                  console.log(card);
              })
            }


            console.log(neutral);

        })

        var stagePosition = noChar;
        var newStageCoach = {gameID:gameID, car:stagePosition};
        StageCoach.create(newStageCoach, function(err,stageCoach){
            var newShotgun = {
                gameID: game._id,
                character: "Shotgun",
                onRoof: true,
                lootamount:1000,
                onStageCoach: true,
            }
            Character.create(newShotgun, function(err, shotgun){
                if (err){
                    console.log(err);
                }
                // for(i=0; i< 3; i++){
                //   var card = "Bullet";
                //   var newCard = {
                //       gameID: game._id,
                //       characterID: shotgun._id,
                //       character: "Neutral",
                //       card: card,
                //       isBullet: true,
                //   }
                //   Card.create(newCard, function(err, card){
                //       if (err){
                //           console.log(err);
                //       }
                //       console.log(card);
                //   })
                // }
                var amount= 1000;
                var type= "Strongbox";
                var newStrongbox = {
                    characterID: shotgun._id,
                    gameID: gameID,
                    amount: amount,
                    type: type,
                }
                Loot.create(newStrongbox, function(err, strongbox){
                    if (err){
                        console.log(err);
                    }

                    console.log(strongbox);
                })

                console.log(shotgun);

            })
        })

        var newTrain = {gameID:gameID};
        Train.create(newTrain, function(err, train){
          if (err){
              console.log(err);
          }
          console.log(train);

          //marshal car
          var gameID = game._id;
          var trainID = train._id;
          var carNumber = noChar;
          var horses= 0;
          var marshal= true;

          var marshalCar = {
              gameID: gameID,
              trainID: trainID,
              carNumber: carNumber,
              horses: horses,
              marshal: marshal,
          }

          Car.create(marshalCar, function(err, car){
            if (err){
                console.log(err);
            }
            console.log(car.carNumber);
            console.log(car);
            var carNo= car.carNumber;
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
            })
            //create marshal
            var newMarshal = {
                gameID: game._id,
                character: "Marshal",
                car: noChar,
                onRoof: false,
                onStageCoach: false,
            }
            Character.create(newMarshal, function(err, marshal){
                if (err){
                    console.log(err);
                }
                // for(i=0; i< 13; i++){
                //   var card = "Bullet";
                //   var newCard = {
                //       gameID: game._id,
                //       characterID: marshal._id,
                //       character: Neutral,
                //       card: card,
                //       isBullet: true,
                //   }
                //   Card.create(newCard, function(err, card){
                //       if (err){
                //           console.log(err);
                //       }
                //       console.log(card);
                //   })
                // }
                console.log(marshal);
            })
          })

          //CAR 1
          if (noChar>=1){
              carNumber = 0;
              marshal= false;
              var newCar = {
                  gameID: gameID,
                  trainID: trainID,
                  carNumber: carNumber,
                  horses: horses,
                  marshal: marshal,
              }

              Car.create(newCar, function(err, car){
                if (err){
                    console.log(err);
                }
                console.log(car.carNumber);
                console.log(car);
                for (i = 0; i < 4; i++) {

                    var carNo= car.carNumber;
                    var amount= 250+Math.floor(Math.random()*5)*50;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newPurse, function(err, purse){
                      if (err){
                          console.log(err);
                      }

                      console.log(purse);
                    })
                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newJewel, function(err, jewel){
                      if (err){
                          console.log(err);
                      }

                      console.log(jewel);
                    })

                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var type= "OldWhisky";
                    var halfDrunk= false;
                    var isFull= true;
                    var newOldWhisky = {
                        amount:0,
                        gameID: gameID,
                        car: carNo,
                        type: type,
                        halfDrunk: halfDrunk,
                        isFull: isFull
                    }
                    Loot.create(newOldWhisky, function(err, oldWhisky){
                        if (err){
                            console.log(err);
                        }

                        console.log(oldWhisky);
                    })
                    if(noChar==1){
                        res.status(200).send('OK');
                    }
                }
              })

          }
          //CAR 2
          if (noChar>=2){
              carNumber = 1;
              var newCar = {
                  gameID: gameID,
                  trainID: trainID,
                  carNumber: carNumber,
                  horses: horses,
                  marshal: marshal,
              }

              Car.create(newCar, function(err, car){
                if (err){
                    console.log(err);
                }
                console.log(car.carNumber);
                console.log(car);

                for (i = 0; i < 3; i++) {

                    var carNo= car.carNumber;
                    var amount= 250+Math.floor(Math.random()*5)*50;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newPurse, function(err, purse){
                      if (err){
                          console.log(err);
                      }

                      console.log(purse);
                    })
                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newJewel, function(err, jewel){
                      if (err){
                          console.log(err);
                      }

                      console.log(jewel);
                    })

                }

                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var type= "Whisky";
                    var halfDrunk= false;
                    var isFull= true;
                    var newWhisky = {
                        gameID: gameID,
                        car: carNo,
                        type: type,
                        halfDrunk: halfDrunk,
                        isFull: isFull
                    }
                    Loot.create(newWhisky, function(err, whisky){
                        if (err){
                            console.log(err);
                        }

                        console.log(whisky);
                    })
                    if(noChar==1){
                        res.status(200).send('OK');
                    }
                }

                if(noChar==2){
                    res.status(200).send('OK');
                }
              })

          }

          //CAR 3
          if(noChar>=3){
              carNumber = 2;
              var newCar = {
                  gameID: gameID,
                  trainID: trainID,
                  carNumber: carNumber,
                  horses: horses,
                  marshal: marshal,
              }

              Car.create(newCar, function(err, car){
                if (err){
                    console.log(err);
                }
                console.log(car.carNumber);
                console.log(car);
                for (i = 0; i < 3; i++) {

                    var carNo= car.carNumber;
                    var amount= 250+Math.floor(Math.random()*5)*50;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newPurse, function(err, purse){
                      if (err){
                          console.log(err);
                      }

                      console.log(purse);
                    })
                }
                for (i = 0; i < 0; i++) {
                    var carNo= car.carNumber;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newJewel, function(err, jewel){
                      if (err){
                          console.log(err);
                      }

                      console.log(jewel);
                    })

                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var type= "Whisky";
                    var halfDrunk= false;
                    var isFull= true;
                    var newWhisky = {
                        amount:0,
                        gameID: gameID,
                        car: carNo,
                        type: type,
                        halfDrunk: halfDrunk,
                        isFull: isFull
                    }
                    Loot.create(newWhisky, function(err, whisky){
                        if (err){
                            console.log(err);
                        }

                        console.log(whisky);
                    })
                    if(noChar==1){
                        res.status(200).send('OK');
                    }
                }
                if(noChar==3){
                    res.status(200).send('OK');
                }
              })

          }
          //CAR 4
          if(noChar>=4){
              carNumber = 3;
              var newCar = {
                  gameID: gameID,
                  trainID: trainID,
                  carNumber: carNumber,
                  horses: horses,
                  marshal: marshal,
              }

              Car.create(newCar, function(err, car){
                if (err){
                    console.log(err);
                }
                console.log(car.carNumber);
                console.log(car);
                for (i = 0; i < 1; i++) {

                    var carNo= car.carNumber;
                    var amount= 250+Math.floor(Math.random()*5)*50;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newPurse, function(err, purse){
                      if (err){
                          console.log(err);
                      }

                      console.log(purse);
                    })
                }
                for (i = 0; i < 0; i++) {
                    var carNo= car.carNumber;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newJewel, function(err, jewel){
                      if (err){
                          console.log(err);
                      }

                      console.log(jewel);
                    })

                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var type= "Whisky";
                    var halfDrunk= false;
                    var isFull= true;
                    var newWhisky = {
                        amount:0,
                        gameID: gameID,
                        car: carNo,
                        type: type,
                        halfDrunk: halfDrunk,
                        isFull: isFull
                    }
                    Loot.create(newWhisky, function(err, whisky){
                        if (err){
                            console.log(err);
                        }

                        console.log(whisky);
                    })
                    if(noChar==1){
                        res.status(200).send('OK');
                    }
                }
                if(noChar==4){
                    res.status(200).send('OK');
                }
              })

          }
          //CAR 5
          if(noChar>=5){
              carNumber = 4;
              var newCar = {
                  gameID: gameID,
                  trainID: trainID,
                  carNumber: carNumber,
                  horses: horses,
                  marshal: marshal,
              }

              Car.create(newCar, function(err, car){
                if (err){
                    console.log(err);
                }
                console.log(car.carNumber);
                console.log(car);
                for (i = 0; i < 0; i++) {

                    var carNo= car.carNumber;
                    var amount= 250+Math.floor(Math.random()*5)*50;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newPurse, function(err, purse){
                      if (err){
                          console.log(err);
                      }

                      console.log(purse);
                    })
                }
                for (i = 0; i < 3; i++) {
                    var carNo= car.carNumber;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newJewel, function(err, jewel){
                      if (err){
                          console.log(err);
                      }

                      console.log(jewel);
                    })

                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var type= "Whisky";
                    var halfDrunk= false;
                    var isFull= true;
                    var newWhisky = {
                        amount:0,
                        gameID: gameID,
                        car: carNo,
                        type: type,
                        halfDrunk: halfDrunk,
                        isFull: isFull
                    }
                    Loot.create(newWhisky, function(err, whisky){
                        if (err){
                            console.log(err);
                        }

                        console.log(whisky);
                    })
                    if(noChar==1){
                        res.status(200).send('OK');
                    }
                }
                if(noChar==5){
                    res.status(200).send('OK');
                }
              })

          }

          //CAR 6
          if(noChar==6){
              carNumber = 5;
              var car = {
                  gameID: gameID,
                  trainID: trainID,
                  carNumber: carNumber,
                  horses: horses,
                  marshal: marshal,
              }

              Car.create(car, function(err, car){
                if (err){
                    console.log(err);
                }
                console.log(car.carNumber);
                console.log(car);
                for (i = 0; i < 1; i++) {

                    var carNo= car.carNumber;
                    var amount= 250+Math.floor(Math.random()*5)*50;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newPurse, function(err, purse){
                      if (err){
                          console.log(err);
                      }

                      console.log(purse);
                    })
                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        car: carNo,
                        amount: amount,
                        type: type,
                    }
                    Loot.create(newJewel, function(err, jewel){
                      if (err){
                          console.log(err);
                      }

                      console.log(jewel);

                    })

                }
                for (i = 0; i < 1; i++) {
                    var carNo= car.carNumber;
                    var type= "Whisky";
                    var halfDrunk= false;
                    var isFull= true;
                    var newWhisky = {
                        amount:0,
                        gameID: gameID,
                        car: carNo,
                        type: type,
                        halfDrunk: halfDrunk,
                        isFull: isFull
                    }
                    Loot.create(newWhisky, function(err, whisky){
                        if (err){
                            console.log(err);
                        }

                        console.log(whisky);
                    })
                    if(noChar==1){
                        res.status(200).send('OK');
                    }
                }
                if(noChar==6){
                    res.status(200).send('OK');
                }
              })

          }



        })
    });

});

module.exports = router;
