const express        = require("express"),
      app            = express(),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override"),
      seedDB         = require("./seeds"),
      bodyParser = require('body-parser');

const Card = require("./models/card");
const User = require("./models/user");
const Character = require("./models/character");
const Game = require("./models/game");
const Car = require("./models/car");
const Train = require("./models/train");
const Round = require("./models/round");

//Routes Require
//Browser Routes
var browserUserRoutes = require("./browserRoutes/user");
var browserCardRoutes = require("./browserRoutes/card");
var browserGameRoutes = require("./browserRoutes/game");
var browserLobbyRoutes = require("./browserRoutes/lobby");


//API Routes
var apiUserRoutes = require("./apiRoutes/user");
var apiCardRoutes = require("./apiRoutes/card");
var apiGameRoutes = require("./apiRoutes/game");
var apiIndexRoutes = require("./apiRoutes/index");
var apiIdRoutes = require("./apiRoutes/id");
var apiLobbyRoutes = require("./apiRoutes/lobby");
var apiTrainRoutes = require("./apiRoutes/train");
var apiCarRoutes = require("./apiRoutes/car");
var apiStageCoachRoutes = require("./apiRoutes/stagecoach");
var apiCharacterRoutes = require("./apiRoutes/character");
var apiHorseRoutes = require("./apiRoutes/horse");
var apiActionRoutes  = require("./apiRoutes/action");
var apiActionRoutesTwo  = require("./apiRoutes/action2");
var apiRoundRoutes  = require("./apiRoutes/round");
var apiTurnRoutes  = require("./apiRoutes/turn");
var apiGameStatusRoutes  = require("./apiRoutes/gamestatus");
var apiLobbyStatusRoutes  = require("./apiRoutes/lobbystatus");
var apiRoundGenerationRoutes  = require("./apiRoutes/generateround");
var apiSaveRoutes  = require("./apiRoutes/save");
var apiHostageGenerationRoutes  = require("./apiRoutes/generatehostage");
var apiPhaseRoutes  = require("./apiRoutes/phase");

console.log("haha");

mongoose.connect('mongodb+srv://Hexanome-14:COMP361D2@cluster0.jxfnz.mongodb.net/<coltDBSave>?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false});
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

seedDB();

//Routes assign
//Browser Routes
app.use("/browser/users", browserUserRoutes);
app.use("/browser/cards", browserCardRoutes);
app.use("/browser/games", browserGameRoutes);
app.use("/browser/lobbies", browserLobbyRoutes);

//API Routes
app.use("/users", apiUserRoutes);
app.use("/cards", apiCardRoutes);
app.use("/games", apiGameRoutes);
app.use("/", apiIndexRoutes);
app.use("/", apiIdRoutes);
app.use("/lobby", apiLobbyRoutes);
app.use("/train", apiTrainRoutes);
app.use("/car", apiCarRoutes);
app.use("/character", apiCharacterRoutes);
app.use("/horse", apiHorseRoutes);
app.use("/action", apiActionRoutes);
app.use("/action", apiActionRoutesTwo);
app.use("/round", apiRoundRoutes);
app.use("/turn", apiTurnRoutes);
app.use("/gamestatus", apiGameStatusRoutes);
app.use("/lobbystatus", apiLobbyStatusRoutes);
app.use("/generateRounds", apiRoundGenerationRoutes);
app.use("/", apiSaveRoutes);
app.use("/generateHostages", apiHostageGenerationRoutes);
app.use("/stagecoach", apiStageCoachRoutes);
app.use("/phase", apiPhaseRoutes);


app.get("/", function(req,res){
  // res.render("index");
  res.render("underconstruction");
})


/* GAME ROUTES */
app.post("/game/create", function(req,res){
  var newGame = {
    phase: "Scheming",
    session: req.body.session,
    train: req.body.train,
    stagecoach: req.body.stagecoach,
    round: req.body.round
  };
  Game.create(newGame, function(err, product){
    if(err){
      console.log(err);
    }else{
      //redir back to product admin
      console.log(product);
      res.send(product);
    }
  });
});

/* CHARACTER ROUTES */

app.post("/character/create", function(req,res){
  var newCharacter = {
    userID: req.body.userID,
    character: req.body.character,
    lootamount: 0,
    onRoof: false,
    inTurn: false,
    finishedTurn: false,
  };
  Character.create(newCharacter, function(err, product){
    if(err){
      console.log(err);
    }else{
      //redir back to product admin
      console.log(product);
      res.send(product);
    }
  });
});

app.get("/character/:id", function(req,res){
  Character.findById(req.params.id, function(err, data){
       if(err) console.log(err);
       else res.send(data);
   });
});

app.put("/character/:id/position", function(req,res){
    Character.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { upsert: true, new: true }
    );
});

app.put("/character/:id/position", function(req,res){
    Character.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { upsert: true, new: true }
    );
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3030;
}

app.listen(port, function(){
    console.log("Hosted on local port 3030");
});
