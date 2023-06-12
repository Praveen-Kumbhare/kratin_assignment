const mongoose = require('mongoose');
const Medications = require('./Medications');
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
    },
    password: {
        type:String,
        require:true,
    },
    contact:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    Medications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Medications'
        }
    ]
    
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User