const mongoose = require('mongoose');
//registrater schema
const profileSchema = mongoose.Schema({
    username: {
        type: String,
    },

    email: {
        type: String,
    },

    password:{
        type: String,
    },
    status:{
        type:String
    },
    location:{
        type:String
    },
    contact:{
        type:Number
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const profile =  mongoose.model('profile', profileSchema);
module.exports = regist;
