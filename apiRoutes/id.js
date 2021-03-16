const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card"),
      Car           = require("../models/car"),
      Character      = require("../models/character"),
      Game           = require("../models/game"),
      Loot           = require("../models/loot"),
      Marshal        = require("../models/marshal"),
      Position       = require("../models/position"),
      Round          = require("../models/round"),
      Train          = require("../models/train"),
      Turn           = require("../models/turn"),
      User           = require("../models/user");

// router.get("/gameID", function(req,res){
//
// })
// router.get("/trainID", function(req,res){
//     var gameID = mongoose.Types.ObjectId(req.body.gameID);
//
//     var ret = "{trainID:}"
//     return
//
// })

module.exports = router;
