const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user'),
      Character           = require('../models/character'),
      Game           = require('../models/game')

router.post("/ready", function(req, res){
    var sessionID = req.body.sessionID;
    var username = req.body.username;
    User.findOne({sessionID: sessionID, username:username}, function(err, foundUser){
        foundUser.ready = true;
    })
})

router.get("/allReady/:sessionID", function(req,res){
    var sessionID = req.params.sessionID;
    var usersPresent = User.find({sessionID: sessionID}).count();
    var usersReady = User.find({sessionID: sessionID, ready:true}).count();
    var answer = false;
    if (usersReady+1==usersPresent){
        answer = true;
    }
    var response = {
        allReady: answer
    }
    return res.send(JSON.stringify(response));

});


module.exports = router;
