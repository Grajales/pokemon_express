const express = require('express')
const router = express.Router(); //handles specific routes

const User = require('../models').User;
const Pokemon = require('../models').Pokemon;

//Index

  router.get("/", (req, res) => {
    res.render("users/index.ejs");
  });
//Signup
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')

})
//Login
router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

//Post for the login

router.post("/login", (req, res) => {
    User.findAll({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then((users) => {
      if (users.length > 0) {
        console.log('correct username/password');
        let user = users[0];
        res.redirect(`/users/profile/${user.id}`);
      } else {
        console.log('wrong username/password');
        res.redirect('/users');
      }
    });
  });

// POST - CREATE NEW USER FROM SIGNUP
  router.post("/", (req, res) => {
    User.create(req.body).then(newUser => {
      res.redirect(`/users/profile/${newUser.id}`);
    });
  });
  //Get User's profile
router.get("/profile/:id", (req, res) => {
    User.findByPk(req.params.id, {
      include: [
        {
          model: Pokemon,
          attributes: ['id', 'name']
        },
      ],
    }).then((user) => {
        res.render("users/profile.ejs", { user} )    
  
    });
  });

//post for sing up

// EDIT PROFILE
router.put("/profile/:id", (req, res) => {
    User.update(req.body, {
      where: { id: req.params.id },
      returning: true
    }).then((user) => res.redirect(`/users/profile/${req.params.id}`));
  });

// DELETE USER
router.delete("/:id", (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/users"); //redirect back to index route
    });
  });


module.exports =router;

