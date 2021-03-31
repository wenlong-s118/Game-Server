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
        foundUser.save();
    });
    res.status(200).send('OK');

})

router.get("/allReady/:sessionID", async function(req,res){
    var sessionID = req.params.sessionID;
    var usersPresent = await User.count({sessionID: sessionID});
    console.log(usersPresent);
    var usersReady = await User.count({sessionID: sessionID, ready:true});
    console.log(usersReady);
    var answer = false;
    if (usersReady+1==usersPresent){
        answer = true;
    }
    var response = answer;
    return res.send(JSON.stringify(response));

});


module.exports = router;
