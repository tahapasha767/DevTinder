const { default: mongoose } = require('mongoose')

require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String
    },
    password:{
        type:Number
    }
})

module.exports=mongoose.model("User",userSchema)