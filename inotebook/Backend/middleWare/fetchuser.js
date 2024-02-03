var jwt = require("jsonwebtoken");
const JWT_SECRET = "Ankitisagood$boy";

const fetchuser=(req,res,next)=>{
    // req, res ,next takes a middleware , middleware is a function 
    // we call next in the end to call the next middleware ie. async(req,res in the auth.js userdetails )
    //get the user from jwt token
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"invalid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        console.log(data, "data for logging in")
        req.user=data.user;
        next(); 
    } catch (error) {
        res.status(401).send({error:"invalid token"})
    }

}
module.exports=fetchuser;