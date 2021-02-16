const express = require('express')
const router = express.Router(); //handles specific routes
const Pokemon = require('../models').Pokemon;
const User = require('../models').User;
const Team = require("../models").Team;
// Add pokemon model

//INDEX

router.get("/", (req, res) => {
	Pokemon.findAll().then((pokemons) => {
	  res.render("index.ejs", {
		pokemons: pokemons,
	  });
	});
  });
//New this renders the html form
router.get('/new',(req,res)=>{
    res.render("new.ejs")
});
//Need to create a new handler: POST gets activated until clicked

router.post("/", (req, res) => {
	Pokemon.create(req.body).then((newPokemon) => {
	  res.redirect("/pokemons");
	});
  });
  //SHOW

// router.get("/:id", (req, res) => {
// 	Pokemon.findByPk(req.params.id).then((pokemon) => {
// 	  res.render("show.ejs", {
// 		pokemon: pokemon,
// 	  });
// 	});
//   });

  //Get - SHOW Route
router.get("/:id", (req, res) => {
	Pokemon.findByPk(req.params.id, {
		include : [{
			model: User,
			attributes: ['name'],
		},
		{
		  model: Team,
		},],
		attributes: ['name', 'img']
	})
	.then(pokemon => {
	  console.log(pokemon);
		res.render('show.ejs', {
			pokemon: pokemon
		});
	});
  });
 //This is the get route for edit

router.get("/:id/edit", function (req, res) {
	Pokemon.findByPk(req.params.id).then((foundPokemon) => {
	Team.findAll().then((allTeams) => {
	  res.render("edit.ejs", {
		pokemon: foundPokemon,
		teams: allTeams,
	  });
	});
  });
});
  // router.put
router.put("/:id", (req, res) => {
	Pokemon.update(req.body, {
	  where: { id: req.params.id },
	  returning: true,
	}).then(() => {

	  			res.redirect("/pokemons");
			});
		});

//Delete 

router.delete("/:id", (req, res) => {
	Pokemon.destroy({ where: { id: req.params.id } }).then(() => {
	  res.redirect("/pokemons");
	});
  });



//update the index of the pokemon we want to update







module.exports =router;