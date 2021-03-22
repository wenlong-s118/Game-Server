const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot");

//car routes



router.get("/carLoot/:carID", function(req,res){
    var carID = mongoose.Types.ObjectId(req.params.carID);
    Loot.find({carID:carID}).lean().exec(function(err, loots){
      return res.send(JSON.stringify(loots));
    })

});

router.get("charactersInCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = mongoose.Types.ObjectId(req.params.carNo);
    Character.find({gameID:gameID, carNo:carNo, onRoof:false}).lean().exec(function(err, foundCharacters){
        return res.send(JSON.stringify(foundCharacters));
    });
});

router.get("charactersOnRoofCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = mongoose.Types.ObjectId(req.params.carNo);
    Character.find({gameID:gameID, carNo:carNo, onRoof:true}).lean().exec(function(err, foundCharacters){
        return res.send(JSON.stringify(foundCharacters));
    });
});

router.get("charactersAtCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = mongoose.Types.ObjectId(req.params.carNo);
    Character.find({gameID:gameID, carNo:carNo}).lean().exec(function(err, foundCharacters){
        return res.send(JSON.stringify(foundCharacters));
    });
});





module.exports = router;
