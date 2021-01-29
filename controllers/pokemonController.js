const express = require('express')
const router = express.Router(); //handles specific routes

// Add pokemon model
const pokemon = require('../models/data.js')//could be "../" or "../../"
//New this renders the html form
//INDEX
router.get('/',(req,res)=>{
    // res.send(pokemon[req.params.index])
    res.render("index.ejs",{pokemon:pokemon})
});
//New
router.get('/new',(req,res)=>{
    res.render("new.ejs")
})
//Delete 
router.delete('/:index', (req, res) => {
	pokemon.splice(req.params.index, 1); //removes one (1) item from the array
	res.redirect('/pokemon');  //redirect back to index route
});
//New this renders the html form
router.get('/new',(req,res)=>{
    res.render("new.ejs")
})
//Need to create a new handler: POST gets activated until clicked
router.post('/', (req,res)=>{
    //gets the request body and adds it to the database
    pokemon.push(req.body);
    res.redirect('/pokemon');
})
// //This is the get route for edit
router.get('/:index/edit', (req, res)=>{
	res.render('edit.ejs', //render views/edit.ejs
	 	{ //pass in an object that contains
	 		poke: pokemon[req.params.index], //the fruit object
	 		index: req.params.index //... and its index in the array
	 	}
	 );
});
//update the index of the pokemon we want to update

router.put('/:index', (req, res) => { //:index is the index of our fruits array that we want to change
	pokemon[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/pokemon'); //redirect to the index page
});

//SHOW
router.get('/:index',(req,res)=>{
    // res.send(pokemon[req.params.index])
	res.render("show.ejs",{poke:pokemon[req.params.index]})
	index=req.params.index
});



module.exports =router;