const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment')

const messageSchema = new Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
  },
  email:{
    type:String
  },
  customEmail:{
    type:String,
    required:[true, 'custom email is required']
  },
  name:{
    type:String,
    required:[true, 'name is required']
  },
  body:{
    type:String,
    required:[true, 'body is required']
  },
  createdAt:{
    type:Date,
    required:[true, 'createdAt is required'],
    default: moment().format('LLL')
  },
  updatedAt:{
    type:Date,
    default: Date.now()
  },
  
});

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages