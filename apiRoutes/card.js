const express        = require("express"),
      router         = express.Router(),
      mongoose       = require("mongoose"),
      Card           = require("../models/card");

/* CARD ROUTES */

app.post("/create", function(req,res){
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
