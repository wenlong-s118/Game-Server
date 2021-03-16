const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot");

//car routes



router.put("/carLoot", function(req,res){
    var carID = mongoose.Types.ObjectId(req.body.carID);
    Loot.find({carID:carID}).lean().exec(function(err, loots){
      return res.send(JSON.stringify(loots));
    })

})
// router.get("/adjacentCars", function(req,res){
//     var carID = mongoose.Types.ObjectId(req.body.carID);
//     var adjacentCars = [];
//
//     Car.findById(carID, function(err, foundCart){
//         var carNumber = foundCart.carNumber;
//         var left = carNumber;
//         var
//         if(carNumber>0){
//
//         }
//
//         Car.find({carNumber:carNumber})
//     })
//
//
// })


module.exports = router;
