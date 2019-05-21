const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regSchema = new Schema({
    username: {
        type: String,
    },
    googleId:{
        type:String
    },

    email: {
        type: String
    },
    contact:{
        type:Number
    },
    status:{
        type:String,
    },
    image:{
        type: String
    },
    password:{
        type: String,
    },

   
    date:{
        type:Date,
        default: Date.now
    }
});

const regist =  mongoose.model('user', regSchema);
module.exports = regist;
