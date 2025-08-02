const jwt=require('jsonwebtoken');
const User=require('../models/user')


const authCheck=async (req, res, next) => {
  try{
    const cookies=req.cookies.usertoken;
    if(!cookies)
    {
      return res.status(401).send("Unauthorized: No token provided");
    }
    var decoded = jwt.verify(cookies, 'DEVTINDER34');
    var {_id}=decoded;
    const user=await User.findById(_id);
    console.log("Hello World");
    
    //console.log("User",user)
    if(!user)
    {
      throw new Error("User not found");
    }
    req.user=user;
    //console.log(user);
    next();

  }
  catch(err){
    console.error("Error in authCheck middleware:", err);
    return res.status(500).send("Internal Server Error");
  }
   
}

module.exports={authCheck};