const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby           = require("../models/lobby"),
      User           = require("../models/user"),
      Character           = require("../models/character");

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
      charactersAvailable:charactersAvailable
    }
    Lobby.create(newLobby, function(err, lobby){
        if (err){
            console.log(err);
        }

        console.log(lobby);
    })
    var newUser = {
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

})
//join lobby
//creates new user and character
router.post("/join", function(req,res){
    var noChar = 1;
    var sessionID = req.body.sessionID;
    var username = req.body.username;


    var newUser = {
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

})
//leave Lobby
//removes user and character

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

        temp = -1;
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
        if(temp==-1){
            res.redirect("/");
        }

    })
    User.findOne({'username':username}, function(err, foundUser){
        var userID = foundUser._id;
        var newCharacter = {
            userID:userID,
            character:characterName
        }
        Character.create(newCharacter, function(err, character){
            if (err){
                console.log(err);
            }

            console.log(character);
        })
        Lobby.findOne({'sessionID':sessionID}, function(err, foundLobby){


            foundLobby.characterSelectLock = false;
            foundLobby.save();

        })
    })


    res.redirect("/");
})


//update characters to game




module.exports = router;
