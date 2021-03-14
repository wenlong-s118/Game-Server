const express        = require("express"),
      app            = express(),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override")
      bodyParser = require('body-parser');


const Card = require("./models/card");
const User = require("./models/user");
const Character = require("./models/character");
const Game = require("./models/game");
const Cart = require("./models/cart");
const Position = require("./models/position");
const Train = require("./models/train");


//Routes Require
//Browser Routes
var browserUserRoutes = require("./browserRoutes/card");
var browserCardRoutes = require("./browserRoutes/user");


//API Routes
var apiUserRoutes = require("./apiRoutes/user");
var apiCardRoutes = require("./apiRoutes/card");



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
app.use("/browser/users", browserCardRoutes);
app.use("/browser/cards", browserCardRoutes);


//API Routes
app.use("/users", apiCardRoutes);
app.use("/cards", apiCardRoutes);



app.get("/", function(req,res){
  // res.render("index");
  res.render("underconstruction");
})

/* USER ROUTES */

app.post("/user/create", function(req,res){
  var newUser = {
    sessionID: req.body.sessionID,
    username: req.body.username,
  };
  User.create(newUser, function(err, product){
    if(err){
      console.log(err);
    }else{
      //redir back to product admin
      console.log(product);

      res.send(product);
    }
  });
});

/* CARD ROUTES */

app.post("/card/create", function(req,res){
  var newCard = {
    character: "Ghost",
    card: "Punch",
  };
  Card.create(newCard, function(err, product){
    if(err){
      console.log(err);
    }else{
      //redir back to product admin
      console.log(product);
      res.send(product);
    }
  });
});

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
