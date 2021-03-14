const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user')

/* USER ROUTES */


router.post("/", function(req,res){
    var newUser = {
        sessionID: req.body.sessionID,
        username: req.body.username,
    };
    User.create(newUser, function(err, user){
        if(err){
            console.log(err);
        }else{
            //redir back to product admin
            console.log(user);

            res.send(user);
        }
    });
});

module.exports = router;
