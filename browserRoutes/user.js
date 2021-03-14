const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      User           = require('../models/user')

router.get("/all", function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log(err);
        } else{
            res.render("users/all", {users: users});
        }
    });
})

module.exports = router;
