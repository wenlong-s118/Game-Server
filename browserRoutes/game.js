
const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Game           = require('../models/game')

router.get("/all", function(req, res){
    Game.find({}, function(err, games){
        if(err){
            console.log(err);
        } else{
          return res.send(JSON.stringify(games));
        }
    });
});


module.exports = router;
