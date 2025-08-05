const express=require('express');
const User=require('../models/user');
const bcrypt = require('bcrypt');
const { model } = require('mongoose');
const authRouter=express.Router();

authRouter.post('/signup',async(req,res)=>{
   // console.log("Request body:", req.body);
   
   // const user=new User(req.body);
   // const {password}= req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
   
    try{
        const userData={
            ...req.body,
            password: hash
        }
        const user=new User(userData);
        console.log("User data:", user);
         
  
        await user.save();
        console.log("User created successfully:");
        // res.cookie("myCookie","jshbjshiwiuhwyiwihiwuiujs");
         res.status(201).send("User created successfully");
    }
    catch(err){
        console.error("Error creating user:", err);
        res.status(500).send(err.message || "Internal Server Error");
    }
})

authRouter.post('/loginuser',async(req,res)=>{
    const {emailId,password}=req.body;
    try{
        //generating token 
       
        const user_instance=await User.findOne({emailId:emailId});
        //console.log(user_instance);
        if(user_instance.length==0)
        {
            
            res.send("User not found . Please sign up first.");
            return;
            
        }
        bcrypt.compare(password,user_instance.password, async function(err, result) {
            if(result){
                //generating usertoken here
                console.log("User found and password matched");
                 const token=await user_instance.getJWT();
                 res.cookie("usertoken",token)

                res.status(200).send("Login successful");
                return;
            }
            else{
                console.log(err);
                res.status(401).send("Invalid credentials");
                return;
            }
    // result == true
});
    }
    catch{
        console.error("Error logging in user:", err);
        res.status(500).send("Internal Server Error");
        return;

    }

})
authRouter.post('/logout',async(req,res)=>{
    res.cookie("usertoken",null);
    res.send("User logged out successfully");
})
module.exports = authRouter;
