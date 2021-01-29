const express = require('express')
const router = express.Router(); //handles specific routes

// Add users model
const users = require('../models/users.js')//could be "../../"


// Add index route
router.get('/', (req, res) => {
    res.render('users/index.ejs')
})
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')

})
router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

//Need to create a new handler: POST gets activated until clicked
//post for sing up
router.post('/profile', (req,res)=>{
    users.push(req.body);
    console.log(req.body);
    console.log(users);
    let userIndex=users.length-1;
    // res.redirect('profile/'+ userIndex);//another option
    res.redirect(`profile/${userIndex}`);
})
//Post for the login
router.post('/login', (req,res)=>{
    let thisUser = users.findIndex((user)=>
        user.username===req.body.username && user.password==req.body.password
    )
    res.redirect('/users/profile/'+ thisUser);
});
//Delete 
router.delete('/:index', (req, res) => {
    users.splice(req.params.index, 1); //removes one (1) item from the array
    console.log(users)
	res.redirect('/users');  //redirect back to index route
});
//This is the get route for edit
router.get('/profile/:index', (req, res)=>{
	res.render('users/profile.ejs', {
        userInfo: users[req.params.index], //the fruit object
        index: req.params.index //... and its index in the array
    });
});
router.put('/profile/:index', (req, res) => { //:index is the index of our fruits array that we want to change
	users[req.params.index] = req.body; //in our users array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
    let index =req.params.index
    console.log(users)
    res.redirect('/users/profile/'+index); //redirect to the index page
});


module.exports =router;

