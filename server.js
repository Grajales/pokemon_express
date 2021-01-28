const express = require('express');
const app = express();
const pokemon =require("./models/data.js");
const methodOverride = require('method-override');
//MIDDLEWARE STARTS
//Note that the order of the middleware apps matter, since they have dependencies
app.use((req, res, next) => {
    console.log('I run for all routes');
    // console.log(req.originalUrl);
    next();
});
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//MIDDLEWARE ENDS

//New this renders the html form
//INDEX
app.get('/pokemon',(req,res)=>{
    // res.send(pokemon[req.params.index])
    res.render("index.ejs",{pokemon:pokemon})
});


//SHOW
app.get('/pokemon/:index',(req,res)=>{
    // res.send(pokemon[req.params.index])
    res.render("show.ejs",{poke:pokemon[req.params.index]})
});


app.listen(3000,()=>{
    console.log("I am listening");
});