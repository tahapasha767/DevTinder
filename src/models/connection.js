const mongoose=require('mongoose');
const User=require('./user');
const connectionSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User' 
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    // Reference to the User model
    },
    status:{
        type:String,
        enum:{
        values:['interested','accepted','rejected','ignored'],
        message:"Status must be either interested, accepted, rejected or ignored"

        },

    }

},{timestamps:true})
const Connection=mongoose.model('Connection',connectionSchema);
module.exports=Connection;