const router = require('express').Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../confirnOuter/outher-confirm');
//  const bcrypt = require('bcryptjs');

 const user = require('../models/google-model');
require('../models/users-model');
const regist = mongoose.model('user');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    }else{
        next();
     }
}
router.get('/', ensureAuthenticated, (req,res) => {
    res.render('profile');
});

router.get('/profile',ensureAuthenticated, (req,res) =>{
    res.render('profile');
});

//Get edit Profile page
router.get('/editprofile', (req, res) =>{
    res.render('editprofile');
});

//update profile page
router.put('/editprofile/:id', (req, res) =>{
    regist.findOne({
        _id: req.params.id
      })
      .then(updateUser => {
        // New values
        updateUser.username = req.body.username;
        updateUser.email = req.body.email;
        updateUser.conctact = req.body.contact;
    
        updateUser.save()
          .then(updateUser => {
            res.redirect('/profile');
        });
      });
})
module.exports = router;