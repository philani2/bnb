const router = require('express').Router();
const mongoose = require('mongoose');
const user = require('../models/users-model')
const Rooms = require('../models/landlord-model');

// const Rooms =  mongoose.model('house');


router.get('/', (req, res)=>{
    Rooms.find({status: 'public'})
    .populate('user') 
    .then(newroom =>{
        res.render('landlord', {
            data: newroom
        });
        
    });
});

//show page 

router.get('/show/:id', (req, res ) =>{
    Rooms.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(show =>{
        res.render('show', {
            show: show
        });
    });
});

router.get('/add', (req, res)=>{
    res.render('add');
});

router.post('/', (req, res)=>{
    const newRoom = {
        location: req.body.location,
        price: req.body.price,
        body: req.body.body,
        status: req.body.status,
        image: req.body.image,
        user: req.user.id
    }

    new Rooms(newRoom)
    .save()
    .then(house =>{
        res.redirect(`/landlord/show/${house.id}`);
    });
});

//edit router
router.get('/edit/:id', (req, res) =>{
    Rooms.find({_id:req.params.id})
    .then(room => {
        res.render('edit', {
            data: room
            
        });
    })
})

//update edit form


router.put('/:id',(req, res)=>{
    // Rooms.findOne({
    //     _id: req.params.id
    // })
    // .then(house => {
    //     house.price = req.body.price
    // })
    // .then(room =>{
    //     res.render('dashbord',{
    //         data: room
    //     });
    // });
        
  
 res.send('put');

  })





module.exports = router;