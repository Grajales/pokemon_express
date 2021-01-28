const express = require('express');
const app = express();
const pokemon =require("./models/data.js");

//MIDDLEWARE STARTS
//Note that the order of the middleware apps matter, since they have dependencies


//MIDDLEWARE ENDS

app.get('/pokemon',(req,res)=>{
     res.send(pokemon)
});

app.get('/pokemon/:index',(req,res)=>{
    // res.send(pokemon[req.params.index])
    res.render("index.ejs",{pokes:pokemon})
});

app.listen(3000,()=>{
    console.log("I am listening");
});