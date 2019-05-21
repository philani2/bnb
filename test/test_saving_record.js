const mocha = require('mocha');
const assert = require('assert');
const regSchema = require('../models/user_model');

describe('Save record', function(){

    it('save to database', function(done){
        var newuser = new regSchema({
            username: 'philani',
            email: 'phila@g.com',
            password:'12345'
        });
        newuser.save().then(function(){
            assert(newuser.isNew === false);
            done();
        });
    });
});