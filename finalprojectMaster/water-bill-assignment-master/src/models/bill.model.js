const mongoose = require('mongoose');
const moment = require('moment')
const { Schema } = mongoose;

const billSchema = new Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:[true, 'userId is required']
  },
  firstName:{
    type:String,
    required:[true, 'firstName is required']
  },
  lastName:{
    type:String,
    required:[true, 'lastName is required']
  },
  meterNumber:{
    type:Number,
    required:[true, 'meterNumber is required']
  },
  previousReading:{
    type:Number,
    required:[true, 'previous reading is required']
  },
  currentReading:{
    type:Number,
    required:[true, 'current reading is required']
  },
  consumption:{
    type:Number,
    required:[true, 'water consumption is required']
  },
  cost:{
    type:Number,
    required:[true, 'cost is required']
  },
  createdAt:{
    type:Date,
    required:[true, 'createdAt is required'],
    default: Date.now()
  },
  updatedAt:{
    type:Date,
    default: Date.now()
  },
  timeCreated:{
    type:String,
    default: () => moment().valueOf()
  }
});

const Bill = mongoose.model('Bills', billSchema);
module.exports = Bill
