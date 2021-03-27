const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Turn           = require("../models/turn"),
      Game           = require("../models/game"),
      Round          = require("../models/round");

//get next player
router.get("/next/:gameID", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);

    Game.findById(gameID,'playerIndex').lean().exec(function(err, nextPlayer){
        return res.send(JSON.stringify(nextPlayer));
    })
})
//set next player
router.post("/next", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var playerIndex = req.body.playerIndex;

    Game.findById(gameID, function(err, foundGame){
        foundGame.playerIndex = playerIndex;
        foundGame.save();
    })
    res.status(200).send('OK');
})

router.post("/endOfTurn", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //find roundindex from game:
    Game.findById(gameID, function(err, foundGame){
        //update turnIndex and playerIndex
        foundGame.turnIndex++;
        //handle switch turns start index at back
        foundGame.playerIndex = 0;
        foundGame.save();
    })
})

router.get("/currentTurn", function(req,res){
    //returns turnType
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //find game to get roundID: roundIndex, gameID
    Game.findById(gameID, function(err, foundGame){
        var roundIndex = foundGame.roundIndex;
        var turnIndex = foundGame.turnIndex;
        Round.findOne({gameID:gameID, roundNumber:roundIndex}, function(err, foundRound){
            //find turn by roundID and turnIndex
            //return turn type

            Turn.findOne({roundID:foundRound._id, turnNumber:turnIndex}, function(err, foundTurn){
                var turnType = {
                    turn: foundTurn.turnType
                };
                return res.send(JSON.stringify(turnType));
            })

        })
    })


})


module.exports = router;
