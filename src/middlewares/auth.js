const authCheck=(req, res, next) => {
    const token="xyz";
    const isAdminAuthorized=token==="xy8z";
    if(!isAdminAuthorized)
    {
        res.status(401).send("Unauthorized");
    }
    else{
  next();
   
    }
}

module.exports={authCheck};