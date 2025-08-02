const express = require('express');
const app = express();
const port = 3000;
//const {authCheck}=require('./middlewares/auth')
 const {connectDb}=require("./config/database");
 const User= require("./models/user");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser = require("cookie-parser"); // ✅ import it
const {authCheck}=require('./middlewares/auth')



 app.use(express.json());
 app.use(cookieParser());

app.get('/userall',async(req,res)=>{
   try{
    const all_user= await User.find({})
    res.status(200).send(all_user);
   }
   catch(err){
    console.error("Error fetching users:",err);
    res.status(500).send("Internal Server Error");
   }
}) 
app.get('/userinfo',authCheck,async(req,res)=>{
  
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
app.patch('/updateuser',async(req,res)=>{
    const{_id}=req.body;

    try{
        const updateUser = await User.findByIdAndUpdate(
            _id,
            req.body,
            { runValidators: true, new: true }
          );
        res.status(200).send("User updated successfully");
    }
    catch(err){
        console.error("Error updating user:", err);
        res.status(500).send("Invalis User ID or Internal Server Error");
    }

})

app.post('/signup',async(req,res)=>{
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
        res.cookie("myCookie","jshbjshiwiuhwyiwihiwuiujs");
        res.status(201).send("User created successfully");
    }
    catch(err){
        console.error("Error creating user:", err);
        res.status(500).send(err.message || "Internal Server Error");
    }
})

app.post('/loginuser',async(req,res)=>{
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

// app.get("/user/:userid/:password/:age", (req, res) => {
//     console.log(req.params);
//   res.send("You Can give endpoint as /colour or /color");
// });
// app.get("/color", (req, res) => {
//   res.send("You Can give endpoint as /colour or /color");
//   console.log(req.params);

// });
// app.get("/user",(req,res,next)=>{
//     console.log("the respnse of the 1st callback");
//     next();
//     res.send("Hello this response 1")

// },
// (req, res) => {
  
//     res.send("Hello this is response 2");
//   }
// )
// app.use("/admin",authCheck );
// app.get("/admin/getUsers",(req,res)=>{
    
//     res.send("Data all sent")

// })
// app.get("/admin/deleteUser",(req,res)=>{
    
//     res.send("Deleted All User")

// })
connectDb().then(()=>{
    console.log("Connected to the database");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });

}).catch((err)=>{
    console.error("Error connecting to the database", err);
})



