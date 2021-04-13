const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Character      = require("../models/character"),
      Game           = require('../models/game'),
      Lobby          = require("../models/lobby");

router.post("/start", function(req, res){
    var sessionID = req.body.sessionID;
    Lobby.findOne({sessionID:sessionID}, function(err, foundLobby){
        foundLobby.started = true;
        foundLobby.save();
        res.status(200).send('OK');
    })


})

router.get("/started/:sessionID", function(req,res){
    var sessionID = req.params.sessionID;
    Lobby.findOne({sessionID:sessionID},'started').lean().exec(function(err, started){
        return res.send(JSON.stringify(started));
    })

});

router.get("/allAboard/:gameID", async function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var allCharacters = await Character.count({gameID: gameID, isUser:true});
    console.log(allCharacters);
    var charactersAboard = await Character.count({gameID: gameID, isUser:true, boarded:true});
    console.log(charactersAboard);
    var answer = false;
    if (allCharacters==charactersAboard){
        answer = true;
    }
    var response = answer;
    return res.send(JSON.stringify(response));

});

router.get("/isLoaded/:sessionID", function(req, res){
    var sessionID = req.params.sessionID;
    Game.findOne({sessionID:sessionID}).lean().exec(function(err, foundGame){
      if(foundGame == null){
        return res.status(500).send(false);
        console.log("Game not found ");
      }
      else{
        if(foundGame.loaded == true){
            console.log("Is Loaded: true ");
            return res.send(JSON.stringify(true));
        }
        else{
            console.log("Is Loaded: false ");
          return res.send(JSON.stringify(false));
        }
      }
    })
})

module.exports = router;
