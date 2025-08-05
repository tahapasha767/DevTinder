const express=require('express');
const profileRouter=express.Router();
const User=require('../models/user');
const {authCheck}=require('../middlewares/auth');


profileRouter.get('/userall',async(req,res)=>{
   try{
    const all_user= await User.find({})
    res.status(200).send(all_user);
   }
   catch(err){
    console.error("Error fetching users:",err);
    res.status(500).send("Internal Server Error");
   }
}) 
profileRouter.get('/userinfo',authCheck,async(req,res)=>{
  
   // const {emailId}=req.body;

    try{
       // const cookies=req.cookies.usertoken;
        // if(!cookies){
        //     return res.status(401).send("Unauthorized: No token provided");
        // }
        // var decoded = jwt.verify(cookies, 'DEVTINDER34');
        // const {_id}=decoded;
       // console.log("Cookies:", decoded);

     const all_user= req.user;
     console.log("User info:", all_user);
     res.status(200).send(all_user);
    }
    catch(err){
     console.error("Error fetching users:",err);
     res.status(500).send("Internal Server Error");
    }
 }) 



 profileRouter.patch('/updateuser',authCheck,async(req,res)=>{
  const all_required_params=['firstName','lastName','age','gender','skills','about','photo'];//all the required params
    try{
     
   const check_if_all_params_present=Object.keys(req.body).every((key)=>
         all_required_params.includes(key))
    if(check_if_all_params_present)
    {
        //can u complete the update user profile functionality
        const user=await User.findById(req.user._id)
        Object.assign(user,{
            ...req.body}
        )

        await user.save();
        console.log("User profile updated successfully:", user);
        res.status(200).send("User profile updated successfully");

        
    }
    else{
        throw new Error("Error: All required parameters are not present.");
    }

    }
   
  
   
   catch(err){
    console.error("Error updating user profile:", err);
    if(err.message.includes("All required parameters are not present.")){
        res.status(400).send(err.message);
    }
    else{
        res.status(500).send("Internal Server Error");
    }

   }
   
    
 
 })

 module.exports=profileRouter;