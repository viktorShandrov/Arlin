const jwt = require("./utils")

exports.auth= async(req,res,next)=>{
    try{
        const token =  req.headers.authorization;
        if(token&&token!=="null"){
            req.user = await jwt.verify(token,jwt.secret)
        }
        next()
    }catch (error) {
        // throw new Error("Невалидна сесия")
        res.status(403).json({message:"Невалидна сесия"})
    }
}
exports.isAuth= async(req,res,next)=>{

    if(req.user){
        next()
    }else{
        // throw new Error("Трябва влезете в профила си, за да достъпите ресурса")
        res.status(403).json({message:"Трябва влезете в профила си, за да достъпите ресурса"})
    }


}