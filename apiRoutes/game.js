const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Game           = require('../models/game')



/* GAME ROUTES */
router.post("/", function(req,res){
  var newGame = {
    phase: "Scheming",
    session: req.body.session,
    train: req.body.train,
    stagecoach: req.body.stagecoach,
    round: req.body.round
  };
  Game.create(newGame, function(err, product){
    if(err){
      console.log(err);
    }else{
      //redir back to product admin
      console.log(product);
      res.send(product);
    }
  });
});

module.exports = router;
