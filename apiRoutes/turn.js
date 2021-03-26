const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Turn           = require("../models/turn");

router.get("/next/:gameID/:turnNumber", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.params.gameID);
    var turnNumber = req.params.turnNumber;

    Turn.findOne({gameID:gameID, turnNumber:turnNumber},'playerIndex').lean().exec(function(err, gameID){
        return res.send(JSON.stringify(gameID));
    })
})

router.post("/next", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    var turnNumber = req.body.turnNumber;
    var playerIndex = req.body.playerIndex;

    Turn.findOne({gameID:gameID, turnNumber:turnNumber}, function(err, foundTurn){
        foundTurn.playerIndex ++;
        foundTurn.save();
        res.status(200).send('OK');
    })
})

router.post("/endOfTurn", function(req, res){
    var gameID = mongoose.Types.ObjectId(req.body.gameID);
    //find roundindex from game:
    Game.findById(gameID, function(err, foundGame){
        var roundIndex = foundGame.roundIndex;
        //find round: roundindex and gameid
        Round.findOne({gameID:gameID, roundNumber:roundIndex}, function(err, foundRound){
            foundRound.turnIndex++;
            foundRound.save();
        })
    })

})



module.exports = router;
