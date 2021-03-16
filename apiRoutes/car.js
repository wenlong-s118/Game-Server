const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot");

//car routes



router.get("/carLoot", function(req,res){
    var carID = mongoose.Types.ObjectId(req.body.carID);
    Loot.find({carID:carID}).lean().exec(function(err, loots){
      return res.end(JSON.stringify(loots));
    })

})



module.exports = router;
