const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const  LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/google-model');
const regist = require('../models/users-model');
// const User = require('../models/user-model');
const keys = require('./keys');

passport.serializeUser((user,done)=>{
    done(null,user.id);

})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user) =>{
        done(null,user);
    })

});
// use google stratgy
module.exports = function(passport){
passport.use(new GoogleStrategy({
    //google strategy options
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret:keys.google.clientSecret,
    proxy: true
}, (accessToken,refreshToten,profile, done)=>{
    const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
    console.log(image)
    
    const newUser = {
        goodleID: profile.id,
        username: profile.name.givenName,
      //  email: profile.emails[0].value,
        image: image
    }
    //check if user exist
    User.findOne({goodleID: profile.id})
    .then(user => {
        if(user){
            done(null, user);
        }else{
            //create new user
            new User(newUser)
            .save()
            .then(user =>done(null, user));
        }
    })
}))
}

module.exports = function(passport){
    passport.use(new LocalStrategy(function(username,password,done){
            // local Strategy
            let query = {username:username};
            regist.findOne(query, function(err, user){
                if(err) throw err;
                if(!user){
                    return done(null, false, {message: 'No user found'});
                }
            
                // match Password
                bcrypt.compare(password,user.password, function(err,isMatch){
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{
                    return done(null, false, {message: 'Wrong Password'});
            
                    }
                })
            })
    }))
        passport.serializeUser(function(user, done){
            done(null,user.id);
        });
        passport.deserializeUser(function(id,done){
            regist.findById(id, function(err, user) {
                done(err, user);
            });
        });
    }
