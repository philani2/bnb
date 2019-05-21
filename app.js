const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const methodOverride = require('method-override');
const RouterOuth = require('./auther/outher-router');
const profileOuth = require('./auther/profile-router');
const registerOuther = require('./auther/user-router');
const landlord = require('./auther/landlord-router');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const keys = require('./config/keys')
const connect = require('./test/connection');
const User = require('./models/google-model');
Rooms = require('./models/landlord-model');
const cookieSession = require('cookie-session');
const crypto = require('crypto');
const Grid = require('grid')

app.use('/materialize', express.static('materialize'));

//bodyparser middleware
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(expressValidator());
app.use(cookieSession({ 
  maxAge: 168 * 420 * 420 * 7000,
  keys:[keys.session.cookieKey] 
}));

//Epress Session Middleware 
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(flash());

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//Global variable
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
next();
})

//Express validotor middleware
app.use(expressValidator({
  errorFormatter: function(param,msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

require('./config/passport-setup')(passport);
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
 
app.use('*',(req, res, next) =>{
  res.locals.user = req.user || null;
  next();
});
//use authRouter
app.use('/auth', RouterOuth);
app.use('/profile', profileOuth);
app.use('/users', registerOuther);
app.use('/landlord', landlord);


// cotrollers
app.get('/', function(req, res){
  Rooms.find({status: 'public'})
  .populate('user') 
  .then(newroom =>{
      res.render('index', {
          data: newroom
      });

});

});

app.listen(3000);
console.log('i am in port 3000');