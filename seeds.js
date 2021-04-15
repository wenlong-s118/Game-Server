const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      random         = require("mongoose-simple-random");
      Card           = require("./models/card"),
      Car            = require("./models/car"),
      Character      = require("./models/character"),
      Game           = require("./models/game"),
      Horse           = require("./models/horse"),
      Hostage          = require("./models/hostage"),
      HostageGenerator = require("./models/hostagegenerator"),
      Lobby          = require("./models/lobby"),
      Loot           = require("./models/loot"),
      Round          = require("./models/round"),
      RoundGenerator = require("./models/roundgenerator"),
      StageCoach     = require("./models/stagecoach"),
      Train          = require("./models/train"),
      User           = require("./models/user");

function seedDB(){
    var card = {
      order: 0
    };
    Card.create(card);
    var car = {
      carNumber: 0
    };
    Car.create(car);
    var character = {
      car: 0
    };
    Character.create(character);
    var game = {
      roundIndex: 0
    }
    Game.create(game);
    var horse = {
        car: 0
    };
    Horse.create(horse);
    var hostage = {
        onStageCoach: false
    };
    Hostage.create(hostage);
    var hostageGenerator = {
        hostagesAvailable: []
    };
    HostageGenerator.create(hostageGenerator);
    var lobby = {
        noChar: 0
    };
    Lobby.create(lobby);
    var loot = {
        amount: 0
    };
    Loot.create(loot)
    var roundGenerator = {
        stationsAvailable: []
    };
    RoundGenerator.create(roundGenerator)
    var round = {
        roundNumber: 0
    };
    Round.create(round);
    var stageCoach = {
        car: 0
    };
    StageCoach.create(stageCoach);
    var train = {
        carCount: 0
    };
    Train.create(train);
    var user = {
        ready: true
    };
    User.create(user);
}


module.exports = seedDB;
