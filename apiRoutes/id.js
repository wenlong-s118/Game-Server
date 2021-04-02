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
      Turn           = require("../models/turn"),
      User           = require("../models/user"),
      StageCoach     = require("../models/stagecoach");

router.get("/gameID/:id", function(req,res){
    var sessionID = req.params.id;
    Game.findOne({sessionID:sessionID},'_id').lean().exec(function(err, gameID){
      return res.send(JSON.stringify(gameID));
    })
});
//pointless to deprecate
router.get("/trainID/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Train.find({gameID:gameID},'_id').lean().exec(function(err, trainID){
      return res.send(JSON.stringify(trainID));
    })
});
//pointless to deprecate
router.get("/stageCoachID/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Train.find({gameID:gameID},'_id').lean().exec(function(err, stageCoachID){
      return res.send(JSON.stringify(stageCoachID));
    })
});
//pointless to deprecate
router.get("/roundID/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Round.find({gameID:gameID},'_id').lean().exec(function(err, roundID){
      return res.send(JSON.stringify(roundID));
    })
});
//pointless to deprecate
router.get("/characterID/:gameID/:name", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var name = req.body.name;
    Character.find({gameID:gameID, character:name},'_id').lean().exec(function(err, characterID){
      return res.send(JSON.stringify(characterID));
    })
});

module.exports = router;
