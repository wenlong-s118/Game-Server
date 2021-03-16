const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card");

router.get("/all", function(req, res){
  Card.find({}, function(err, cards){
    if(err){
      console.log(err);
    } else{
      return res.send(JSON.stringify(cards));
    }
  });
})

module.exports = router;
