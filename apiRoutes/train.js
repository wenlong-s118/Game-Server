const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot");

//train routes

//deprecated
router.get("/trainCars/:trainID", function(req,res){
    var trainID = mongoose.Types.ObjectId(req.params.trainID);

    Car.find({trainID:trainID}).lean().exec(function(err, cars){
      return res.send(JSON.stringify(cars));
    })
});
//deprecated
router.put("/trainLoot", function(req,res){
    var trainID = mongoose.Types.ObjectId(req.body.trainID);
    Loot.find({trainID:trainID}).lean().exec(function(err, loots){
      return res.send(JSON.stringify(loots));
    })

})



module.exports = router;
