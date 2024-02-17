const jwt = require("./utils")

exports.auth= async(req,res,next)=>{
    try{
        const token =  req.headers.authorization;
        if(token&&token!=="null"){
            req.user = await jwt.verify(token,jwt.secret)
        }
        next()
    }catch (error) {
        res.status(403).json({message:"Invalid token"})
    }
}
exports.isAuth= async(req,res,next)=>{

    if(req.user){
        next()
    }else{
        res.status(403).json({message:"Forbidden for unauthenticated users"})
    }


}