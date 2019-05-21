const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new  mongoose.Schema({
    price: {
        type: Number,
    },
    location:{
        type:String
    },
    body: {
        type: String,
        default: Date.now
    },
    contact:{
        type:Number
    },
    image:{
        type: String,
        default: Date.now    
    },
    
    status:{
        type: String,
        default: 'public'
    },
    
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const Rooms =  mongoose.model('house', roomSchema);
module.exports = Rooms;
 