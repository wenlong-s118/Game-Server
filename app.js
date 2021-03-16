const express        = require("express"),
      app            = express(),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override")
      bodyParser = require('body-parser');


const Card = require("./models/card");
const User = require("./models/user");
const Character = require("./models/character");
const Game = require("./models/game");
const Car = require("./models/car");
const Position = require("./models/position");
const Train = require("./models/train");


//Routes Require
//Browser Routes
var browserUserRoutes = require("./browserRoutes/user");
var browserCardRoutes = require("./browserRoutes/card");
var browserGameRoutes = require("./browserRoutes/game");


//API Routes
var apiUserRoutes = require("./apiRoutes/user");
var apiCardRoutes = require("./apiRoutes/card");
var apiGameRoutes = require("./apiRoutes/game");
var apiIndexRoutes = require("./apiRoutes/index");
var apiIdRoutes = require("./apiRoutes/id");
var apiLobbyRoutes = require("./apiRoutes/lobby");
var apiTrainRoutes = require("./apiRoutes/train");
var apiCarRoutes = require("./apiRoutes/car");





mongoose.connect('mongodb+srv://Hexanome-14:COMP361D2@cluster0.jxfnz.mongodb.net/<coltDB>?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false});
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Routes assign
//Browser Routes
app.use("/browser/users", browserUserRoutes);
app.use("/browser/cards", browserCardRoutes);
app.use("/browser/games", browserGameRoutes);



//API Routes
app.use("/users", apiUserRoutes);
app.use("/cards", apiCardRoutes);
app.use("/games", apiGameRoutes);
app.use("/", apiIndexRoutes);
app.use("/", apiIdRoutes);
app.use("/lobby", apiLobbyRoutes);
app.use("/train", apiTrainRoutes);
app.use("/car", apiCarRoutes);




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


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3030;
}

app.listen(port, function(){
    console.log("Hosted on local port 3030");
});
