const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Card            = require("../models/card"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot"),
      Hostage          = require("../models/hostage"),
      Character     = require("../models/character");

router.get("/hostages/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = req.params.characterName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        Hostage.find({characterID:foundCharacter._id}).lean().exec(function(err, hostages){
          if(hostages){
            var response = {
                hostages: hostages
            };
            return res.send(JSON.stringify(response));
          }
          else{
            res.status(500).send("/character/hostages: no hostages for this character")
          }
        })
    })
});

//character lootByID routes deprecated
router.get("/loot/:characterID", function(req,res){
    var characterID = mongoose.Types.ObjectId(req.params.characterID);
    Loot.find({characterID:characterID}).lean().exec(function(err, loots){
      var response = {
          loots: loots
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

router.get("/lootByName/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = req.params.characterName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        Loot.find({characterID:foundCharacter._id}).lean().exec(function(err, loots){
            var response = {
                loots: loots
            };
            return res.send(JSON.stringify(response));
        })
    })
});

router.get("/hand/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = req.params.characterName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        Card.find({characterID:foundCharacter._id, inHand:true}).lean().exec(function(err, cards){
            var response = {
                hand: cards
            };
            return res.send(JSON.stringify(response));
        })
    })
});

router.get("/deck/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = req.params.characterName;
    Character.findOne({gameID:gameID, character:characterName}, function(err, foundCharacter){
        Card.find({characterID:foundCharacter._id, inDeck:true}).lean().exec(function(err, cards){
            var response = {
                deck: cards
            };
            return res.send(JSON.stringify(response));
        })
    })
});



router.get("/lootAmountByName/:gameID/:characterName", function(req, res){
  var gameID = mongoose.Types.ObjectId(req.params.gameID);
  var characterName = req.params.characterName;
    Character.findOne({gameID:gameID, character:characterName}, 'lootamount').lean().exec(function(err, lootAmount){
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
    Character.findOne({gameID:gameID, character:characterName}, 'car onRoof onStageCoach').lean().exec(function(err, position){
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
    Character.find({gameID:gameID, invisible:{$ne:true}}).sort('turnNumber').lean().exec(function(err, characters){
      var response = {
        characters : characters
      }
      return res.send(JSON.stringify(response));
    })
});

router.get("/allPlayerCharacters/:gameID", function(req,res){
    var gameID = req.params.gameID;
    Character.find({gameID:gameID, isUser:true}).sort('turnNumber').lean().exec(function(err, characters){
      var response = {
        characters : characters
      }
      return res.send(JSON.stringify(response));
    })
});


//No bullets shot
//query charactername, gameid, isBullet=true, isHostile=true
router.get("/bulletsShot/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = req.params.characterName;
    var count = Card.find({character:characterName, gameID:gameID, isBullet:true, isHostile:true},).count();
    var characterCount = count;
    return res.send(JSON.stringify(count));
})
//No bullets left
//6- No bullets shot
router.get("/bulletsLeft/:gameID/:characterName", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var characterName = req.params.characterName;
    var count = 6-Card.find({character:characterName, gameID:gameID, isBullet:true, isHostile:true},).count();
    var characterCount = count;

    return res.send(JSON.stringify(characterCount));
})

router.get("/nameByIndex/:gameID/:index", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var index = req.params.index;
    Character.findOne({gameID:gameID, turnNumber:index},'character').lean().exec(function(err, foundCharacter){

        return res.send(JSON.stringify(foundCharacter));
    })
})
module.exports = router;
