const jwt=require("jsonwebtoken")

require("dotenv").config()

const Authentication=(req,res,next)=>{
    const token = req.headers.authorization;
    // console.log(token)
    if(!token){
        res.send("Please Login")
    }
    const verify = jwt.verify(token, process.env.SECRETKEY);
    // const userId = verify.userId;
    // console.log(userId)
    if(verify){
        // req.body.userId=userId
        // console.log(req.body.userId);
        next()
    }
    else{
        res.send("Login Again")
    }


}

module.exports = { Authentication };