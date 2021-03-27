const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Game           = require('../models/game'),
      Lobby           = require('../models/lobby')

router.get("/all", function(req, res){
    Lobby.find({}, function(err, lobbies){
        if(err){
            console.log(err);
        } else{
          return res.send(JSON.stringify(lobbies));
        }
    });
});


module.exports = router;
