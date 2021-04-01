const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot"),
      StageCoach     = require("../models/stagecoach");

//Loot in Car or on car roof by car number
router.get("/lootInStageCoach/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Loot.find({gameID:gameID, onStageCoach:true, onRoof:false}).lean().exec(function(err, foundLoots){
        var response = {
            loots: foundLoots
        }
        return res.send(JSON.stringify(response));
    });
})

router.get("/lootOnRoofStageCoach/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Loot.find({gameID:gameID, onStageCoach:true, onRoof:true}).lean().exec(function(err, foundLoots){
        var response = {
            loots: foundLoots
        }
        return res.send(JSON.stringify(response));
    });
});


router.get("/charactersInStageCoach/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Character.find({gameID:gameID, onStageCoach:true, onRoof:false}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/charactersOnRoofStageCoach/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = mongoose.Types.ObjectId(req.params.carNo);
    Character.find({gameID:gameID, onStageCoach:true, onRoof:true}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});




module.exports = router;
