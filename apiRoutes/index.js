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

router.post("/initializeGame", function(req,res){
    var sessionID = req.body.sessionID;
    var noChar = req.body.noChar;
    // var round: {type: mongoose.Schema.Types.ObjectId, ref: "Round"};
    // var phase: "";
    // var currentPlayer: {type: mongoose.Schema.Types.ObjectId, ref: "Character"};
    var newGame = {sessionID: sessionID};

    Game.create(newGame, function(err, game){
        if (err) {
            console.log(err);
            res.redirect("/");
        }
        console.log(game._id);
        var gameID = game._id;

        var newRound = {
          gameID : gameID,
          roundType: 'normal',
          turnsInRound: 4,
          cardIsFaceUp: true,
          phase: 'scheming',
        };

        Round.create(newRound, function(err, round){
          if (err){
              console.log(err);
          }
        });

        newTrain = {gameID:gameID};
        Train.create(newTrain, function(err, train){
          if (err){
              console.log(err);
          }
          console.log(train);

          //marshal car
          var gameID = game._id;
          var trainID = train._id;
          var carNumber = 0;
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


          })

          //CAR 1
          if (noChar>=1){
              carNumber = 1;
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

                    var carID = car._id;
                    var amount= 250;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
                    var carID = car._id;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
              })
          }
          //CAR 2
          if (noChar>=2){
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

                    var carID = car._id;
                    var amount= 250;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
                    var carID = car._id;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
              })
          }

          //CAR 3
          if(noChar>=3){
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
                for (i = 0; i < 3; i++) {

                    var carID = car._id;
                    var amount= 250;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
                    var carID = car._id;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
              })
          }
          //CAR 4
          if(noChar>=4){
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
                for (i = 0; i < 1; i++) {

                    var carID = car._id;
                    var amount= 250;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
                    var carID = car._id;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
              })
          }
          //CAR 5
          if(noChar>=5){
              carNumber = 5;
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

                    var carID = car._id;
                    var amount= 250;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
                    var carID = car._id;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
              })
          }

          //CAR 6
          if(noChar=6){
              carNumber = 6;
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

                    var carID = car._id;
                    var amount= 250;
                    var type= "Purse";
                    var newPurse = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
                    var carID = car._id;
                    var amount= 500;
                    var type= "Jewel";
                    var newJewel = {
                        gameID: gameID,
                        trainID: trainID,
                        carID: carID,
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
              })
          }

          //car 1
          var carNumber = 1;

        })
        res.redirect("/");
    });

});

module.exports = router;
