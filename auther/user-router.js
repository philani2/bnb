const router = require('express').Router();
 const passport = require('passport');
 const mongoose = require('mongoose');
 const Room = require('../models/landlord-model');
// const passport = require('../config/passport-setup');
 require('../models/users-model')
const regist = mongoose.model('user')
const bcrypt = require('bcryptjs');
//Bring the register model

 
router.get('/logout', (req,res) =>{
    req.logout();
    res.redirect('/');
});
router.get('/login', (rq,res) =>{
    res.render('login');
});

router.post('/login', (req, res, next) =>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next);
});

router.get('/signup', (req, res) =>{
    res.render('signup');
});

     router.post('/signup', (req, res) => {
    const {username, email, password, confpassword} = req.body;
   
    let errors = [];
    //check required fields
    if(!username || !email || !password || !confpassword){
        errors.push( 'All fields are required!');
    }
    // check if password match
    if(password !== confpassword){
         errors.push( 'Password do not Match!');
    }

    //check the length of password
    if(password.length < 4){
        errors.push('Password must have atleast 8 charectors');
    }

    //check erros
    if(errors.length > 0){
       res.render('signup',{
           errors,
           username,
           email,
           password,
           confpassword
       }); 
    }else{
   regist.findOne({email:email}).then(users =>{
    if(users){
        errors.push('Email already exist try other one');
        res.render('signup');
        errors,username,email,password,confpassword
        console.log(errors); 
     
    }else{
          const newUser = new regist({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
              
          });
          bcrypt.genSalt(10, (err, salt)=>
          bcrypt.hash(newUser.password, salt, (err,hash) =>{
              if(err) {console.log(err)}
              newUser.password = hash;
              newUser.save().then(user =>{
                // req.flash('green', 'You have signUp...');

                res.redirect('/users/login');

              })
                .catch(err=> console.log(err));
          }))
      }
   });
}

});

router.get('/dashbord', (req, res)=>{
    Room.find({user: req.user.id})
        .populate('user')
        .then(rooms =>{
         res.render('dashbord', {
             data: rooms
         });
     });
});



module.exports = router;