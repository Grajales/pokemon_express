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
//New
app.get('/pokemon/new',(req,res)=>{
    res.render("new.ejs")
})
//Delete 
app.delete('/pokemon/:index', (req, res) => {
	pokemon.splice(req.params.index, 1); //removes one (1) item from the array
	res.redirect('/pokemon');  //redirect back to index route
});
//New this renders the html form
app.get('/pokemon/new',(req,res)=>{
    res.render("new.ejs")
})
//Need to create a new handler: POST gets activated until clicked
app.post('/pokemon', (req,res)=>{
    //gets the request body and adds it to the database
    pokemon.push(req.body);
    res.redirect('/pokemon');
})
// //This is the get route for edit
app.get('/pokemon/:index/edit', (req, res)=>{
	res.render('edit.ejs', //render views/edit.ejs
	 	{ //pass in an object that contains
	 		poke: pokemon[req.params.index], //the fruit object
	 		index: req.params.index //... and its index in the array
	 	}
	 );
});
//update the index of the pokemon we want to update

app.put('/pokemon/:index', (req, res) => { //:index is the index of our fruits array that we want to change
	pokemon[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/pokemon'); //redirect to the index page
});

//SHOW
app.get('/pokemon/:index',(req,res)=>{
    // res.send(pokemon[req.params.index])
    res.render("show.ejs",{poke:pokemon[req.params.index]})
});


app.listen(3000,()=>{
    console.log("I am listening");
});