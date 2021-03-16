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

router.put("/loot", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Loot.find({characterID:characterID}).lean().exec(function(err, loots){
      return res.send(JSON.stringify(loots));
    })

});

router.put("/position", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Character.findById(characterID, 'car onRoof').lean().exec(function(err, position){
        return res.send(JSON.stringify(position));
    })

});

router.put("/name", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.body.characterID);
    Character.findById(characterID, 'character').lean().exec(function(err, position){
      return res.send(JSON.stringify(position));
    })
});

router.put("/:id", function(req,res){
    Character.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { upsert: true, new: true }
    );
});


router.put("/allCharacters", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Character.find({gameID:gameID}).lean().exec(function(err, characters){
      return res.send(JSON.stringify(characters));
    })
})


module.exports = router;
