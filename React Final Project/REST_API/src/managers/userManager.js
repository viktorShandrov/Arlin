const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const utils = require("../utils/utils");
const wordManager = require("./wordManager");
const {levelRewards} = require("../utils/utils");




exports.register = async(email,password,repeatedPassword)=>{
    if(!email||!password||!repeatedPassword){
        throw new Error("All fields are required")
    }

    const user =await userModel.findOne({email})
    if(user){
        throw new Error("Email already exists!")
    }

    const newUser = await  userModel.create({email,password,repeatedPassword})
    await wordManager.createWordContainer(newUser,"#a6a600","Неконкретизирани","systemGenerated")
    return exports.login(email,password)

}
exports.login = async (email,password)=>{
    const user = await userModel.findOne({email});
    if(!user) throw new Error("Email or password is incorrect.")
    const isPasswordMatching = await bcrypt.compare(password,user.password);
    if(!isPasswordMatching) throw new Error("Email or password is incorrect.")

    const payload = {
        email,
        _id:user._id,
    }
    const token = await utils.sign(payload,utils.secret)
    return {
        token,
        email,
        userId:user._id,
        role:user.role,
        lastReading:user.lastReading,
        exp:user.exp,
        inventory:user.inventory,
    }

}
exports.getUserInfo = async (_id)=>{
    const user = await userModel.findById(_id);

    delete user.password

    return user.toObject()
}
exports.setExpMultiplier = async (_id,expMultiplier)=>{
    const user = await userModel.findById(_id);

    if(user.inventory.expMultiplier<=0) throw new Error("Нямате налични умножители на опит")
    if(user.expMultiplier>1) throw new Error("Вече имате активиран множител на опит")
    user.expMultiplier = expMultiplier
    user.inventory.expMultiplier-=1
    user.markModified('inventory');
    return user.save()
}


exports.updateUserExp =async (plusExp,user,res) =>{
    const newExp = user.exp + (plusExp*user.expMultiplier)
    const levelWithOldExp = calculateLevel(user.exp)
    res.body ={...res.body,expAdded:plusExp}
    // user.exp = newExp
    await checkIfNewLevel(newExp,levelWithOldExp,user,res)
    return user.save()
}

async function checkIfNewLevel(exp,levelWithOldExp,user,res){
   const levelWithNewExp =  calculateLevel(exp)
        const inventoryItemName = levelRewards[levelWithNewExp]
    if(levelWithNewExp!==levelWithOldExp&&inventoryItemName){
        if(user.inventory.hasOwnProperty(inventoryItemName)){
            user.inventory[inventoryItemName]+=1
        }else{
            user.inventory[inventoryItemName] = 0
        }
        user.markModified('inventory');
        res.body = {...res.body,itemAdded:inventoryItemName}
        return user.save()
    }

}

function calculateLevel(exp) {
    if(!exp) return 0
    let expRequiredForPreviousLevel =0
    let expRequiredForNextLevel = 100
    let level = 0

    while(!(exp>=expRequiredForPreviousLevel&&exp<=expRequiredForNextLevel)){
        level++
        expRequiredForPreviousLevel = expRequiredForNextLevel
        expRequiredForNextLevel*=1.5
    }
    return level

}