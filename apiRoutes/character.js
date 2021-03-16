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

router.get("/loot", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Loot.find({characterID:characterID}).lean().exec(function(err, loots){
      return res.end(JSON.stringify(loots));
    })

});

router.get("/position", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Character.findById(characterID, 'position').lean().exec(function(err, position){
      return res.end(JSON.stringify(position));
    })

});

router.get("/name", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Character.findById(characterID, 'character').lean().exec(function(err, position){
      return res.end(JSON.stringify(position));
    })
});

router.put("/:id", function(req,res){
    Character.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { upsert: true, new: true }
    );
});




module.exports = router;
