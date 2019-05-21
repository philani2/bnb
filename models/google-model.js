const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create Schema
const userSchema = new Schema({

    username:String,
    googleId:String,
    email:String,
    image:String
});
//create model
const User = mongoose.model('User', userSchema);

 module.exports = User;
