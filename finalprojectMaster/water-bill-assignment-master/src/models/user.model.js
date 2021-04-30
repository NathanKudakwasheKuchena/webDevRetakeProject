const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName:{
    type:String,
    required:[true, 'firstName is required']
  },
  lastName:{
    type:String,
    required:[true, 'lastName is required']
  },
  email:{
    type:String,
    required:[true, 'email is required']
  },
  meterNumber:{
    type:Number,
    required:[true, 'meterNumber is required']
  },
  password:{
    type:String,
    required:[true, 'password is required']
  },
  createdAt:{
    type:Date,
    required:[true, 'createdAt is required'],
    default: Date.now()
  },
  updatedAt:{
    type:Date,
    default: Date.now()
  }
});

const User = mongoose.model('Users', userSchema);
module.exports = User
