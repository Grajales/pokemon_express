const express = require('express');
const app = express();
// const pokemon =require("./models/data.js");
const methodOverride = require('method-override');

//MIDDLEWARE STARTS
//Note that the order of the middleware apps matter, since they have dependencies
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log('I run for all routes');
    // console.log(req.originalUrl);
    next();
});

//Controllers and Routes
app.use("/pokemon", require("./controllers/pokemonController.js"))
app.use("/users", require("./controllers/usersController.js"))
//End Controllers and routes
//MIDDLEWARE ENDS

app.listen(3000,()=>{
    console.log("I am listening");
});