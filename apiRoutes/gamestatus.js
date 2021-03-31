const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Game           = require('../models/game'),
      Lobby          = require("../models/lobby");

router.post("/start", function(req, res){
    var sessionID = req.body.sessionID;
    Lobby.findOne({sessionID:sessionID}, function(err, foundLobby){
        foundLobby.started = true;
        foundLobby.save();
        res.status(200).send('OK');
    })


})

router.get("/started/:sessionID", function(req,res){
    var sessionID = req.params.sessionID;
    Lobby.findOne({sessionID:sessionID},'started').lean().exec(function(err, started){
        return res.send(JSON.stringify(started));
    })

});

module.exports = router;
