const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Card           = require("../models/card"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot"),
      Hostage        = require("../models/hostage"),
      Character      = require("../models/character"),
      Horse          = require("../models/horse")



router.get("/allHorses/:gameID", function(req,res){
    var gameID = req.params.gameID;
    Horse.find({gameID:gameID}).lean().exec(function(err, horses){
      var response = {
        horses : horses
      }
      return res.send(JSON.stringify(response));
    })
});


module.exports = router;
