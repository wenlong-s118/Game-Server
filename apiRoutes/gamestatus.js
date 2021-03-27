const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Game           = require('../models/game')

router.post("/start", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    Game.findById(gameID, function(err, foundGame){
        foundGame.started = true;
        foundGame.save();
    })
})

router.get("/started/:gameID", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    Game.findById(gameID,'started').lean().exec(function(err, started){
        return res.send(JSON.stringify(started));
    })

});

module.exports = router;
