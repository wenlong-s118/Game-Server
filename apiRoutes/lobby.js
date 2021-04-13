const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      User           = require("../models/user"),
      Character      = require("../models/character"),
      Horse          = require("../models/horse"),
      Card           = require("../models/card");



//create Lobby
//creates lobby with first user
//creates first character
router.post("/", function(req,res){
    var noChar = 1;
    var sessionID = req.body.sessionID;
    var username = req.body.username;
    var characterSelectLock = false;
    var charactersAvailable = ["Ghost", "Doc", "Tuco", "Cheyenne", "Belle", "Django"];
    var newLobby = {
      noChar:noChar,
      sessionID:sessionID,
      characterSelectLock:characterSelectLock,
      charactersAvailable:charactersAvailable,
      orderIndex:0
    }

    Lobby.create(newLobby, function(err, lobby){
        if (err){
            console.log(err);
        }

        console.log(lobby);
        var newUser = {
            lobbyID: lobby._id,
            sessionID:sessionID,
            username:username,
        }
        //user created
        User.create(newUser, function(err, user){
            if (err){
                console.log(err);
            }
            console.log(user);
            res.status(200).send('OK');
        })
    })


})
//join lobby
//creates new user and character
router.post("/join", function(req,res){
    var sessionID = req.body.sessionID;
    var username = req.body.username;
    Lobby.findOne({'sessionID':sessionID}, function(err, foundLobby){
        foundLobby.noChar++;
        var newUser = {
            lobbyID:foundLobby._id,
            sessionID:sessionID,
            username:username
        }
        //user created
        User.create(newUser, function(err, user){
            if (err){
                console.log(err);
            }

            console.log(user);

        })
        foundLobby.save();
        res.status(200).send('OK');
    })



})
//leave Lobby
//removes user and character
router.post("/leave", function(req,res){

    var sessionID = req.body.sessionID;
    var username = req.body.username;
    Lobby.findOne({'sessionID':sessionID}, function(err, foundLobby){

        foundLobby.noChar--;


        User.findOne({username:username}, function(err, foundUser){
            Character.findOne({userID:foundUser._id}, function(err, foundCharacter){
                var characterName = foundCharacter.character;
                var characterPlayOrder = foundCharacter.turnNumber;
                foundLobby.charactersAvailable.push(characterName);
                foundLobby.orderIndex--;
                console.log(characterPlayOrder);
                Character.find({lobbyID:foundCharacter.lobbyID}, function(err, remainingCharacters){
                    console.log(remainingCharacters);
                    remainingCharacters.forEach(function(remainingCharacter){

                        if(remainingCharacter.turnNumber > characterPlayOrder){
                            remainingCharacter.turnNumber--;
                            remainingCharacter.save();
                        }


                    });
                })
                foundLobby.save();
                Card.find({character:characterName}, function(err, foundCards){
                    foundCards.forEach(function(foundCard){
                        Card.findByIdAndRemove(foundCard._id, function(err){
                            console.log(err);
                        });
                    });
                });

                Character.findOneAndRemove({userID:foundUser._id},function(err){
                    if(err){
                        console.log(err);

                    }

                });
            });

            User.findByIdAndRemove(foundUser._id, function(err){
                if(err){
                    console.log(err);

                }

            })


        })

        res.status(200).send('OK');
    })



})

router.get("/charactersAvailable/:sessionID", function(req, res){
    var sessionID = req.params.sessionID;
    Lobby.findOne({'sessionID':sessionID}, function(err, foundLobby){
      var charactersAvailable = foundLobby.charactersAvailable;
      var response = {
          charactersAvailable: charactersAvailable
      };
      return res.send(JSON.stringify(response));
    })
})

//select character
router.post("/selectcharacter", function(req, res){
    var sessionID = req.body.sessionID;
    var username = req.body.username;
    var characterName = req.body.characterName;
    //locks character select
    Lobby.findOne({'sessionID':sessionID}, function(err, foundLobby){
        if(foundLobby.characterSelectLock == true){
          while(true){
            var unlock = false
            Lobby.findOne({'sessionID':sessionID}, function(err, lockedLobby){
                if(lockedLobby.characterSelectLock == false){
                  unlock = true;
                }

            })
            break;
          }
        }
        foundLobby.characterSelectLock = true;
        foundLobby.save();


    })
    Lobby.findOne({'sessionID':sessionID}, function(err, foundLobby){

        var temp = -1;
        var playOrder = foundLobby.orderIndex;
        console.log(foundLobby.charactersAvailable);
        for(i = 0; i< foundLobby.charactersAvailable.length; i++){
            if(foundLobby.charactersAvailable[i]===characterName){
              temp = i;
              console.log(foundLobby.charactersAvailable[i]);
              foundLobby.charactersAvailable.splice(i,1);
              console.log(foundLobby.charactersAvailable[i]);
              foundLobby.save();
            }
        }
        if(temp != -1){
          User.findOne({username:username, sessionID:sessionID}, function(err, foundUser){
              var userID = foundUser._id;
              var newCharacter = {
                  lobbyID: foundUser.lobbyID,
                  userID:userID,
                  character:characterName,
                  lootamount:0,
                  turnNumber:playOrder,
                  isUser:true
              }
              Character.create(newCharacter, function(err, character){
                  if (err){
                      console.log(err);
                  }
                  console.log(character);
              })
              Lobby.findOne({'sessionID':sessionID}, function(err, foundLobby){
                  foundLobby.orderIndex = playOrder+1;
                  foundLobby.characterSelectLock = false;
                  foundLobby.save();
              });
          });
          res.status(200).send('OK');
        }
        else{
          res.status(500).send("Character already chosen");
        }
    });

});


router.get("/characterInLoaded/:sessionID/:username/:gameID", function(req,res){
  var sessionID = req.params.sessionID;
  var username = req.params.username;
  var gameID = req.params.gameID;
  User.findOne({username:username, sessionID:sessionID}, function(err, foundUser){
    if(err){
      res.status(500).send("Error");
    }
    else{
      console.log("User " + foundUser);
      Character.findOne({userID:foundUser._id, gameID: gameID}, function(err, foundCharacter){
        if(err){
          console.log(err);
          res.status(500).send("Error");
        }else{
          console.log(foundCharacter.character);
          res.status(200).send(foundCharacter.character);
        }
      });
    }
  });
});


//update characters to game by session
router.post("/updateCharactersToGame", function(req,res){
    var sessionID = req.body.sessionID;

    Game.findOne({'sessionID':sessionID}, function(err, foundGame){
      console.log(foundGame);
        Lobby.findOne({'sessionID':sessionID}, async function(err, foundLobby){
          console.log(foundLobby);
            Character.find({lobbyID:foundLobby._id}, function(err, foundCharacters){
                foundCharacters.forEach(function(foundCharacter){
                    var concatenator = "JR";
                    var horseName = foundCharacter.character.concat(concatenator)
                    var newHorse = {
                        gameID: foundGame._id,
                        horse: horseName
                    }
                    Horse.create(newHorse, function(err, horse){
                        if(err){
                            console.log(err);
                        }
                        console.log(horse);
                    })

                    var card = "String";
                    var inHand= false;
                    var inDeck = false;
                    var isBullet= true;

                    for(i=0; i< 6; i++){
                      card = "Bullet";
                      var newCard = {
                          gameID: foundGame._id,
                          characterID: foundCharacter._id,
                          character: foundCharacter.character,
                          card: card,
                          inHand: inHand,
                          inDeck: inDeck,
                          isBullet: isBullet,
                      }
                      Card.create(newCard, function(err, card){
                          if (err){
                              console.log(err);
                          }
                          console.log(card);
                      })
                    }

                    inDeck = true;
                    isBullet = false;
                    card = "Marshal";
                    var newMarshalCard = {
                        gameID: foundGame._id,
                        characterID: foundCharacter._id,
                        character: foundCharacter.character,
                        card: card,
                        inHand: inHand,
                        inDeck: inDeck,
                        isBullet: isBullet,
                    }
                    Card.create(newMarshalCard, function(err, card){
                        if (err){
                            console.log(err);
                        }
                        console.log(card);
                    })

                    for(i=0; i< 2; i++){
                      card = "Loot";
                      var newCard = {
                          gameID: foundGame._id,
                          characterID: foundCharacter._id,
                          character: foundCharacter.character,
                          card: card,
                          inHand: inHand,
                          inDeck: inDeck,
                          isBullet: isBullet,
                      }
                      Card.create(newCard, function(err, card){
                          if (err){
                              console.log(err);
                          }
                          console.log(card);
                      })


                    }
                    for(i=0; i< 2; i++){
                      card = "Move";
                      var newCard = {
                          gameID: foundGame._id,
                          characterID: foundCharacter._id,
                          character: foundCharacter.character,
                          card: card,
                          inHand: inHand,
                          inDeck: inDeck,
                          isBullet: isBullet,
                      }
                      Card.create(newCard, function(err, card){
                          if (err){
                              console.log(err);
                          }
                          console.log(card);
                      })
                    }
                    for(i=0; i< 2; i++){
                      card = "ChangeFloor";
                      var newCard = {
                          gameID: foundGame._id,
                          characterID: foundCharacter._id,
                          character: foundCharacter.character,
                          card: card,
                          inHand: inHand,
                          inDeck: inDeck,
                          isBullet: isBullet,
                      }
                      Card.create(newCard, function(err, card){
                          if (err){
                              console.log(err);
                          }
                          console.log(card);
                      })
                    }
                    for(i=0; i< 2; i++){
                      card = "Shoot";
                      var newCard = {
                          gameID: foundGame._id,
                          characterID: foundCharacter._id,
                          character: foundCharacter.character,
                          card: card,
                          inHand: inHand,
                          inDeck: inDeck,
                          isBullet: isBullet,
                      }
                      Card.create(newCard, function(err, card){
                          if (err){
                              console.log(err);
                          }
                          console.log(card);
                      })
                    }
                    for(i=0; i< 2; i++){
                      card = "Punch";
                      var newCard = {
                          gameID: foundGame._id,
                          characterID: foundCharacter._id,
                          character: foundCharacter.character,
                          card: card,
                          inHand: inHand,
                          inDeck: inDeck,
                          isBullet: isBullet,
                      }
                      Card.create(newCard, function(err, card){
                          if (err){
                              console.log(err);
                          }
                          console.log(card);
                      })
                    }
                    for(i=0; i< 1; i++){
                      card = "Ride";
                      var newCard = {
                          gameID: foundGame._id,
                          characterID: foundCharacter._id,
                          character: foundCharacter.character,
                          card: card,
                          inHand: inHand,
                          inDeck: inDeck,
                          isBullet: isBullet,
                      }
                      Card.create(newCard, function(err, card){
                          if (err){
                              console.log(err);
                          }
                          console.log(card);
                      })
                    }
                    foundCharacter.gameID = foundGame._id;
                    console.log(foundCharacter.gameID);
                    foundCharacter.save();
                });
            });
        });
    })
    res.status(200).send('OK');

})



module.exports = router;
