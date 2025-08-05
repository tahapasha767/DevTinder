const express=require('express');
const User=require('../models/user');
const userRouter=express.Router();
const {authCheck}=require('../middlewares/auth');
const Connection=require('../models/connection');



userRouter.get('/user/requests',authCheck,async(req,res)=>{
    try{
        const userId=req.user._id;
        const alluserRequest= await Connection.find({
            toUserId:userId,
            status:'interested'


        }).populate("fromUserId", "firstName lastName age");
        if(alluserRequest.length===0)
        {
            return res.status(404).send("No connection requests found");
        }
        else{
            
            res.status(200).send(alluserRequest);

        }


    }
    catch(err){
        console.error("Error fetching user requests:",err);
        res.status(500).send("Internal Server Error");

    }

})

module.exports=userRouter;