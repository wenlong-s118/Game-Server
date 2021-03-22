const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot"),
      StageCoach     = require("../models/stagecoach");

router.get("/stageLoot/:stageID", function(req,res){
    var carID = mongoose.Types.ObjectId(req.params.carID);
    Loot.find({carID:carID}).lean().exec(function(err, loots){
      return res.send(JSON.stringify(loots));
    })

});

router.get("charactersInStage/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Character.find({gameID:gameID, stageCoach:true, onRoof:false}).lean().exec(function(err, foundCharacters){
        return res.send(JSON.stringify(foundCharacters));
    });
});

router.get("charactersOnRoofStage/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Character.find({gameID:gameID, stageCoach:true, onRoof:true}).lean().exec(function(err, foundCharacters){
        return res.send(JSON.stringify(foundCharacters));
    });
});

router.get("charactersAtStage/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Character.find({gameID:gameID, stageCoach:true}).lean().exec(function(err, foundCharacters){
        return res.send(JSON.stringify(foundCharacters));
    });
});



module.exports = router;
