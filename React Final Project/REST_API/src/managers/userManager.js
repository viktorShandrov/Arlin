const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const utils = require("../utils/utils");
const wordManager = require("./wordManager");
const bookManager = require("./bookManager");
const {models} = require("mongoose");




exports.register = async(username,email,password,repeatedPassword,image)=>{
    if(!username||!email||!password||!repeatedPassword){
        throw new Error("Всички полета за задължителни")
    }

    const user =await userModel.findOne({email})
    if(user){
        throw new Error("Потребител със същия имейл вече е ригистриран!")
    }
    let imageURL
    if(image){
        imageURL = await bookManager.uploadFile("images",image)
    }

    const userData = {
        username,
        email,
        password,
        repeatedPassword,
        inventory:{},
        imageURL,
    }

    const newUser = await  userModel.create(userData)
    await wordManager.createWordContainer(newUser,"#a6a600","Неконкретизирани","systemGenerated")
    return exports.login(email,password)

}
exports.login = async (email,password)=>{
    const user = await userModel.findOne({email});
    if(!user) throw new Error("Имейлът или паролата са неправилни.")
    const isPasswordMatching = await bcrypt.compare(password,user.password);
    if(!isPasswordMatching) throw new Error("Имейлът или паролата са неправилни.")

    const payload = {
        email,
        _id:user._id,
    }
    const token = await utils.sign(payload,utils.secret)

    const userData = user.toObject()
    delete userData.password
    userData.token = token

    return {...userData,other:{
            advancementsInfo: utils.advancements,
            levelRewards: utils.levelRewards,
        }}

}
exports.getUserInfo = async (_id,res)=>{
    const user = await userModel.findById(_id);

    await exports.checkIfAdvancements(user,res)

    await checkIfExpMultiplierExpires(user)

    delete user.password

    res.body = {...res.body,...user.toObject(),other:{
            advancementsInfo: utils.advancements,
            levelRewards: utils.levelRewards,
        }}
}
async function checkIfExpMultiplierExpires(user){
    const currentTime = new Date()

    if( user.expMultiplier&&
        user.expMultiplier.value>1&&
        user.expMultiplier.dueTo<currentTime
    ){
        user.expMultiplier.value = 1
        if (user.isModified("expMultiplier")) {
            user.markModified("expMultiplier");
        }

        return user.save()
    }
}
exports.checkIfAdvancements = async (user,res)=>{


    const userAdvancements = user.advancements
    const advancementsThatUserDoesntHas = utils.advancements.filter(adv=>!userAdvancements.includes(adv.id))
    if(!res.body) res.body={}
    for (const advancements of advancementsThatUserDoesntHas) {
        if(await advancements.requirement(user)){
            user.advancements.push(advancements.id)
            if(res.body.hasOwnProperty("advancementsAchieved")){
                res.body.advancementsAchieved.push(advancements.id)
            }else{
                res.body.advancementsAchieved =[advancements.id]
            }
            await exports.updateUserExp(utils.defaultExp,user,res)
        }
    }

    if (user.isModified("advancements")) {
        user.markModified("advancements");
    }

    return user.save()
}
exports.useExpMultiplier = async (_id,expMultiplier)=>{
    const user = await userModel.findById(_id);

    if(user.inventory.expMultiplier<=0) throw new Error("Нямате налични умножители на опит")
    if(user.expMultiplier.value>1) throw new Error("Вече имате активиран множител на опит")

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30); // Set expiration time to 20 minutes from now

    user.expMultiplier = {
        value:expMultiplier,
        dueTo:expirationTime
    }

    user.inventory.expMultiplier-=1
    if (user.isModified("inventory")) {
        user.markModified("inventory");
    }

    return user.save()
}


exports.updateUserExp =async (plusExp,user,res) =>{
    const newExp = user.exp + (plusExp*user.expMultiplier.value)
    const levelWithOldExp = exports.calculateLevel(user.exp)
    res.body ={...res.body,expAdded:plusExp}
    user.exp = newExp
    await checkIfNewLevel(newExp,levelWithOldExp,user,res)
    await exports.checkIfAdvancements(user,res)
    return user.save()
}

async function checkIfNewLevel(exp,levelWithOldExp,user,res){
    const levelWithNewExp =  exports.calculateLevel(exp)
    const inventoryItemName = utils.levelRewards[levelWithNewExp]
    if(levelWithNewExp!==levelWithOldExp&&inventoryItemName){
        if(user.inventory.hasOwnProperty(inventoryItemName)){
            user.inventory[inventoryItemName]+=1
        }else{
            user.inventory[inventoryItemName] = 0
        }

        if (user.isModified("inventory")) {
            user.markModified("inventory");
        }
        res.body = {...res.body,itemAdded:inventoryItemName}
        return user.save()
    }

}

exports.calculateLevel=(exp) => {
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

exports.userSubscribedEventHandler = async (userId,planType)=>{
    const user = await userModel.findById(userId)
    user.plan = planType
    const currentDate = new Date();
    user.planSubscriptionDate  = currentDate.toDateString();
    return user.save()
}
exports.userUnsubscribedEventHandler = async (userId)=>{
    const user = await userModel.findById(userId)
    user.plan = "none"
    return user.save()
}

