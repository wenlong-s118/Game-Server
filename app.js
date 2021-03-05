const express        = require("express"),
      app            = express(),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override")

const Card = require("./models/card");

var cardRoutes = require("./browserRoutes/cards");

mongoose.connect('mongodb+srv://Hexanome-14:COMP361D2@cluster0.jxfnz.mongodb.net/<coltDB>?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false});
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


app.use("/cards", cardRoutes);

app.get("/", function(req,res){
  // res.render("index");
  res.render("underconstruction");
})


app.get("/api/index", function(req,res){
  // res.render("games/index");
  res.render("underconstruction");
});

//temporary game route to be replaced after MongoDB setup
app.get("/api/1", function(req,res){
  res.render("underconstruction");
});

app.get("/trial/001", function(req,res){
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
      res.redirect("/");
    }
  });
  res.render("underconstruction");
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3030;
}

app.listen(port, function(){
    console.log("Hosted on local port 3030");
});
