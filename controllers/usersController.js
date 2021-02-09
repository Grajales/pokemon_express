const express = require('express')
const router = express.Router(); //handles specific routes

const User = require('../models').User;
const Pokemon = require('../models').Pokemon;

//Index
// router.get("/", (req, res) => {
//     User.findAll().then((users) => {
//       res.render("index.ejs", {
//         users: users,
//       });
//     });
//   });
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

//Need to create a new handler: POST gets activated until clicked

//Post for the login
// router.post('/login', (req,res)=>{
//     let thisUser = users.findIndex((user)=>
//         user.username===req.body.username && user.password==req.body.password
//     )
//     res.redirect('/users/profile/'+ thisUser);
// });
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
  //This is the get route for edit
// router.get('/profile/:index', (req, res)=>{
// 	res.render('users/profile.ejs', {
//         userInfo: users[req.params.index], //the fruit object
//         index: req.params.index //... and its index in the array
//     });
// });
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
      console.log(user);
      res.render("users/profile.ejs", { user });
    });
  });

//post for sing up
// router.post('/profile', (req,res)=>{
//     users.push(req.body);
//     // console.log(req.body);
//     // console.log(users);
//     let userIndex=users.length-1;
//     // res.redirect('profile/'+ userIndex);//another option
//     res.redirect(`profile/${userIndex}`);
// })


// router.put('/profile/:index', (req, res) => { //:index is the index of our fruits array that we want to change
// 	users[req.params.index] = req.body; //in our users array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
//     let index =req.params.index
//     console.log(users)
//     res.redirect('/users/profile/'+index); //redirect to the index page
// });
// EDIT PROFILE
router.put("/profile/:id", (req, res) => {
    User.update(req.body, {
      where: { id: req.params.id },
      returning: true
    }).then((user) => res.redirect(`/users/profile/${req.params.id}`));
  });
  //Delete 
// router.delete('/:index', (req, res) => {
//     users.splice(req.params.index, 1); //removes one (1) item from the array
//     console.log(users)
// 	res.redirect('/users');  //redirect back to index route
// });
// DELETE USER
router.delete("/:id", (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/users"); //redirect back to index route
    });
  });


module.exports =router;

