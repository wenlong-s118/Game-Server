const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      SavedGame           = require("../models/savedgame"),
      User           = require("../models/user"),
      Character      = require("../models/character"),
      Horse          = require("../models/horse"),
      Card           = require("../models/card");

router.post("/save", function(req,res){
    var sessionID = req.body.sessionID;
    var username = req.body.username;
    Game.findOne({'sessionID':sessionID}, function(err, foundGame){
        Lobby.findOne({sessionID:sessionID}, function(err, foundLobby){
            var newSavedGame = {
              userName: username,
              sessionID: sessionID,
              lobbyID: foundLobby._id,
              gameID: foundGame._id
            }
            SavedGame.create(newSavedGame, function(err, savedGame){
                if(err){
                    console.log(err);
                }
                console.log(savedGame);
                res.status(200).send('OK');
            })
        })
    })

})
router.get("/allSavedGames/:username", function(req,res){
    var username = req.params.username;
    SavedGame.find({userName:username},function(err, foundSavedGames){
        var response = {
            savedGames: foundSavedGames
        };
        return res.send(JSON.stringify(response));
    })
})

router.post("/loadOld", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var currentSession = req.body.currentSessionID;
    SavedGame.findOne({gameID:gameID},function(err, foundSavedGame){
        Game.findById(gameID, function(err, foundGame){
            Lobby.findOne({sessionID:foundGame.sessionID}, function(err, foundLobby){
                foundGame.sessionID = currentSession;
                foundLobby.sessionID = currentSession;
                foundLobby.save();
                foundGame.save();
                res.status(200).send('OK');
            });
        });
    });
});

router.post("/load", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var currentSession = req.body.currentSessionID;
    SavedGame.findOne({gameID:gameID},function(err, foundSavedGame){
        if(foundSavedGame){
            Game.findById(gameID, function(err, foundGame){
                if(foundGame){
                    Lobby.findOne({sessionID:foundGame.sessionID}, function(err, foundLobby){
                        User.find({sessionID:foundGame.sessionID}, function(err, foundUsers){
                            foundUsers.forEach(function(foundUser){
                                foundUser.sessionID = currentSession;
                                foundUser.save();
                            })
                        })
                        foundGame.sessionID = currentSession;
                        foundLobby.sessionID = currentSession;
                        foundGame.loaded = true;
                        foundLobby.save();
                        foundGame.save();
                        res.status(200).send('OK');
                    });
                }

            });
        }

    });
})


module.exports = router;
