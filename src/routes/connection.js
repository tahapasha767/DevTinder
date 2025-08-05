const express=require('express');
const connectionRouter=express.Router();
const {authCheck}=require('../middlewares/auth');
const Connection=require('../models/connection');
const User=require('../models/user');

connectionRouter.post('/request/send/:status/:toUserId',authCheck,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const {status,toUserId}=req.params;
        // Checking if the receiver user exists
        if(fromUserId === toUserId) 
        {
            throw new Error("You cannot send a connection request to yourself");
        }
        const doesUserExists=await  User.findById(toUserId);
        if(!doesUserExists)
        {
            throw new Error("User does not exist");
        }
        if(!['interested', 'ignored'].includes(status)) {
            throw new Error("Invalid status. Must be 'interested' or 'ignored'.");// Validate status
        }
        //Check if the connection already exists
        const existing_Connection=await Connection.findOne({
            $or:[
                {
                    fromUserId,
                    toUserId

                },
                {
                    fromUserId:toUserId,
                    toUserId:fromUserId

                }
            ]

        })
        if(existing_Connection)
        {
            throw new Error("Connection already exists")
        }
        

        const connectionRequest=new Connection({
            fromUserId,
            toUserId,
            status
        })
        const data=await connectionRequest.save();
        console.log("Connection request sent successfully:", data);

        res.json({
            message:"Connection request sent successfully",
            data,
        })




    }
    catch(err){
        console.error("Error sending connection request:", err);
        res.status(500).send("Internal Server Error");

    }

})

connectionRouter.post('/request/send/:status/:requestedUserId',authCheck,async(res,req)=>{
    try{
        const fromUserId=req.user._id;
        const{status,requestedUserId}=req.params;
        //if requestedUser is valid user or not
        const doesUserExists=await User.findById(requestedUserId);
        if(!doesUserExists)
        {
            throw new Error("Reueted user does not exist");
        }
        if(!['accepted','rejected'].includes(status)){
            throw new Error("Invalid status. Must be 'accepted' or 'rejected'.");
        }
        const existingConnection =await Connection.findOne({
            fromUserId:fromUserId,
            toUserId:requestedUserId,
            status:'interested'

        })
        if(!existingConnection)
        {
            throw new Error("No connection request found to respond to");
        }
        existingConnection.status=status;
        const updatedConnection=await existingConnection.save();
        console.log("Connection request updated successfully:", updatedConnection);


    }
    catch(err){
        console.error("Error updating connection request:", err);
        res.status(500).send("Internal Server Error");

    }
})

module.exports=connectionRouter;