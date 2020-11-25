const express        = require("express"),
      app            = express(),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override")

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/api/index", function(req,res){
  res.render("games/index");
});







let port = process.env.PORT;
if (port == null || port == "") {
    port = 3030;
}

app.listen(port, function(){
    console.log("Hosted on local port 3030");
});
