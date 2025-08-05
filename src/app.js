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
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const connectionRouter=require('./routes/connection');
const userRouter=require('./routes/user');





 app.use(express.json());
 app.use(cookieParser());



app.use('/',authRouter,profileRouter,connectionRouter,userRouter);

//creating an api to send user request
app.post('/userrequest',authCheck,async(req,res)=>{
    res.send("User request sent successfully");
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



