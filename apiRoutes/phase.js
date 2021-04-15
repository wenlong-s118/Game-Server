const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Character      = require('../models/character'),
      Game           = require('../models/game')

router.get("/isStealin/:gameID", function(req,res){
    //returns roundType
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    //find game to get roundID: roundIndex, gameID
    Game.findById(gameID, function(err, foundGame){

        if(foundGame){
            //find round by gameID
            //return round type
            var isStealin = foundGame.isStealin;
            return res.send(JSON.stringify(isStealin));
        }else{
            return res.status(500).send(false);
        }


    })

})
router.post("/isStealin", function(req,res){
    //returns roundType
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //find game to get roundID: roundIndex, gameID
    Game.findById(gameID, function(err, foundGame){

        if(foundGame){
            //find round by gameID
            //return round type
            foundGame.isStealin = true;
            foundGame.save();
            res.status(200).send('OK');
        }else{
            console.log("/isStealin: value not set");
            res.status(500).send(false);
        }


    })

})

module.exports = router;
