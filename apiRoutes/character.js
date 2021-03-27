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

router.get("/loot/:characterID", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.params.characterID);
    Loot.find({characterID:characterID}).lean().exec(function(err, loots){
      var response = {
          characters: characters
      };
      return res.send(JSON.stringify(response));
    })

});

router.get("/lootAmount/:characterID", function(req, res){
    var characterID = mongoose.Types.ObjectId(req.params.characterID);
    Character.findById(characterID, 'lootamount').lean().exec(function(err, lootAmount){
      return res.send(JSON.stringify(lootAmount));
    })
});
//deprecated characterPositionById
router.get("/positionById/:characterID", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.params.characterID);
    Character.findById(characterID, 'car onRoof').lean().exec(function(err, position){
        return res.send(JSON.stringify(position));
    })

});
//new route characterPositionByCharacterName
router.get("/positionByName/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = req.params.characterName;
    Character.findOne({gameID:gameID, character:characterName}, 'car onRoof').lean().exec(function(err, position){
        return res.send(JSON.stringify(position));
    })

});

router.get("/name/:characterID", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.params.characterID);
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


router.get("/allCharacters/:gameID", function(req,res){
    var gameID = req.params.gameID;
    Character.find({gameID:gameID}).lean().exec(function(err, characters){
      var response = {
        "characters" : characters
      }
      return res.send(JSON.stringify(response));
    })
});

//No bullets shot
//query charactername, gameid, isBullet=true, isHostile=true
router.get("/bulletsShot/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = mongoose.Types.ObjectId(req.params.characterName);
    var count = Card.find({character:characterName, gameID:gameID, isBullet:true, isHostile:true},).count();
    var characterCount = {
        count: count
    };
    return res.send(JSON.stringify(characterCount));
})
//No bullets left
//6- No bullets shot
router.get("/bulletsLeft/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = mongoose.Types.ObjectId(req.params.characterName);
    var count = 6-Card.find({character:characterName, gameID:gameID, isBullet:true, isHostile:true},).count();
    var characterCount = {
        count: count
    };
    return res.send(JSON.stringify(characterCount));
})

module.exports = router;
