const userModel = require("../models/userModel");

exports.isOwnedByUser = async(userId,itemId,model,fieldName)=>{
    const item = await model.findById(userId)
    if(!item[fieldName].includes(userId)){
        throw new Error("You do not own this item.")
    }
}
exports.isAdmin = async(user,userId)=>{
    if(!user){
         user = await userModel.findById(userId)
    }
    if(user.role!=="admin"){
        throw new Error("You are not admin.")
    }
}