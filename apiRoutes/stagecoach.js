const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot"),
      StageCoach     = require("../models/stagecoach"),
      Hostage          = require("../models/hostage"),
      Horse          = require("../models/horse");

//Loot in Car or on car roof by car number
router.get("/lootInStageCoach/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Loot.find({gameID:gameID, onStageCoach:true, onRoof:{$ne: true}}).lean().exec(function(err, foundLoots){
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


router.get("/charactersInStageCoach/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Character.find({gameID:gameID, onStageCoach:true, onRoof:{$ne: true}}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/charactersOnRoofStageCoach/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Character.find({gameID:gameID, onStageCoach:true, onRoof:true}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/horsesAtStageCoach/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Horse.find({gameID:gameID, onStageCoach:true}).lean().exec(function(err, foundHorses){
        var response = {
            horses: foundHorses
        }
        return res.send(JSON.stringify(response));
    });
});
router.get("/hostagesAtStageCoach/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Hostage.find({gameID:gameID, onStageCoach:true}).lean().exec(function(err, foundHostages){
        var response = {
            hostages: foundHostages
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/position/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    StageCoach.findOne({gameID:gameID}, 'car').lean().exec(function(err, position){
        return res.send(JSON.stringify(position));
    })

});

module.exports = router;
