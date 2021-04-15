const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Lobby          = require("../models/lobby"),
      Game           = require("../models/game"),
      Car            = require("../models/car"),
      Train          = require("../models/train"),
      Loot           = require("../models/loot"),
      Horse          = require("../models/horse");

//car routes


//loot by carID: deprecated
router.get("/carLoot/:carID", function(req,res){
    var carID = mongoose.Types.ObjectId(req.params.carID);
    Loot.find({carID:carID}).lean().exec(function(err, loots){
      return res.send(JSON.stringify(loots));
    })

});
//Loot in Car or on car roof by car number
router.get("/lootInCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Loot.find({gameID:gameID, car:carNo, onRoof:{$ne: true}}).lean().exec(function(err, foundLoots){
        var response = {
            loots: foundLoots
        }
        return res.send(JSON.stringify(response));
    });
})

router.get("/lootOnRoofCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Loot.find({gameID:gameID, car:carNo, onRoof:true}).lean().exec(function(err, foundLoots){
        var response = {
            loots: foundLoots
        }
        return res.send(JSON.stringify(response));
    });
});


router.get("/charactersInCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Character.find({gameID:gameID, car:carNo, onRoof:{$ne: true}}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/playerCharactersInCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Character.find({gameID:gameID, car:carNo, isUser:true, onRoof:{$ne: true}}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/charactersOnRoofCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Character.find({gameID:gameID, car:carNo, onRoof:true}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});
router.get("/playerCharactersOnRoofCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Character.find({gameID:gameID, car:carNo, isUser:true, onRoof:true}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/charactersAtCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Character.find({gameID:gameID, car:carNo}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});
router.get("/playerCharactersAtCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Character.find({gameID:gameID, car:carNo}).lean().exec(function(err, foundCharacters){
        var response = {
            characters: foundCharacters
        }
        return res.send(JSON.stringify(response));
    });
});

router.get("/horsesAtCar/:gameID/:carNo", function(req,res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var carNo = req.params.carNo;
    Horse.find({gameID:gameID, car:carNo}).lean().exec(function(err, foundHorses){
        if(foundHorses){
            var response = {
                horses: foundHorses
            }
            return res.send(JSON.stringify(response));
        }else{
            console.log("/horsesAtCar: no horses here");
            res.status(500).send('/horsesAtCar: no horses here');
        }

    });
});



module.exports = router;
