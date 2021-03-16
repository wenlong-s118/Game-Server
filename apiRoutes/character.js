const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot"),
      Character     = require("../models/character");

//car routes



router.get("/characterLoot", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Loot.find({characterID:characterID}).lean().exec(function(err, loots){
      return res.end(JSON.stringify(loots));
    })

});

router.get("/characterPosition", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Character.findById(characterID, 'position').lean().exec(function(err, position){
      return res.end(JSON.stringify(position));
    })

});


router.get("/allCharacters", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Character.find({gameID:gameID}).lean().exec(function(err, characters){
      return res.end(JSON.stringify(characters));
    })
})


module.exports = router;
