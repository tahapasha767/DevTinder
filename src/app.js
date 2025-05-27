const express = require('express');
const app = express();
const port = 3000;
const {authCheck}=require('./middlewares/auth')
 const {connectDb}=require("./config/database");
 const User= require("./models/user");




 app.use(express.json());

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
app.get('/userinfo',async(req,res)=>{
    const {emailId}=req.body;
    try{
     const all_user= await User.find({emailId:emailId})
     res.status(200).send(all_user);
    }
    catch(err){
     console.error("Error fetching users:",err);
     res.status(500).send("Internal Server Error");
    }
 }) 


app.post('/signup',async(req,res)=>{
   // console.log("Request body:", req.body);
    const user=new User(req.body);
    try{
        await user.save();
        res.status(201).send("User created successfully");
    }
    catch(err){
        console.error("Error creating user:", err);
        res.status(500).send("Internal Server Error");
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



