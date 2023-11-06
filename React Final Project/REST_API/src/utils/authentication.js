const jwt = require("./utils")

exports.auth= async(req,res,next)=>{
    try{
        const token =  req.headers.authorization;
        if(token){
            req.user = await jwt.verify(token,jwt.secret)
        }
        next()
    }catch (error) {
        res.status(403).send("Invalid token")
    }


}
exports.isAuth= async(req,res,next)=>{

    if(req.user){
        next()
    }else{
        res.status(403).send("Forbidden for unauthenticated users")
    }


}