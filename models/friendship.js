const mongoose = require('mongoose');

const frindshipSchema= new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    to_user:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
},{
    timestamps:true
})

const Friendship = mongoose.model('Friendship',frindshipSchema); 
module.exports = Friendship;