const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Card            = require("../models/card"),
      Train          = require("../models/train"),
      Hostage          = require("../models/hostage"),
      Loot           = require("../models/loot"),
      HostageGenerator = require("../models/hostagegenerator")

router.post("/initializeGenerator", async function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    console.log(gameID);
    var hostagesAvailable = [
        "Poodle",
        "Banker",
        "Minister",
        "Teacher",
        "Zealot",
        "OldLady",
        // "PokerPlayer",
        "Photographer"
    ];

    var newHostageGenerator = {
        gameID: gameID,
        hostagesAvailable: hostagesAvailable
    }
    await HostageGenerator.create(newHostageGenerator, function(err, hostageGenerator){
        if (err){
            console.log(err);
        }
        res.status(200).send('OK');
    })

})

router.post("/generateHostages", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    console.log(gameID);
    Game.findById(gameID, function(err, foundGame){
        if(foundGame){
            var noChar = foundGame.noChar;
            var noHostages = noChar - 1;
            HostageGenerator.findOne({gameID:gameID}, function(err, foundHostageGenerator){
                if(foundHostageGenerator){
                    for(i=0; i<noHostages; i++){
                        var index = Math.floor(Math.random() * foundHostageGenerator.hostagesAvailable.length);
                        var hostage = foundHostageGenerator.hostagesAvailable[index];
                        foundHostageGenerator.hostagesAvailable.splice(index,1);
                        var newHostage = {
                            gameID: gameID,
                            hostage: hostage,
                            onStageCoach: true
                        }
                        Hostage.create(newHostage, function(err, hostage){
                            if (err){
                                console.log(err);
                            }
                        })
                    }
                    foundHostageGenerator.save();
                    res.status(200).send('OK');
                }else{
                    console.log("/generateHostages: hostageGenerator not there");
                    res.status(500).send('/generateHostages: hostageGenerator not there');
                }




            })
        }


    })

})


module.exports = router;
