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

router.get("/gameID/:id", function(req,res){
    var sessionID = req.params.id;
    Game.findOne({sessionID:sessionID},'_id').lean().exec(function(err, gameID){
      return res.send(JSON.stringify(gameID));
    })
});

router.get("/trainID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Train.find({gameID:gameID},'_id').lean().exec(function(err, trainID){
      return res.send(JSON.stringify(trainID));
    })
});

router.get("/roundID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Round.find({gameID:gameID},'_id').lean().exec(function(err, roundID){
      return res.send(JSON.stringify(roundID));
    })
});

router.get("/characterID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var name = req.body.name;
    Character.find({gameID:gameID, character:name},'_id').lean().exec(function(err, characterID){
      return res.send(JSON.stringify(characterID));
    })
});

module.exports = router;
