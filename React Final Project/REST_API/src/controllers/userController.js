const {isAuth} = require("../utils/authentication");
const chapterManager = require("../managers/chapterManager");
const userManager = require("../managers/userManager");
const utils = require("../utils/utils");
const router = require("express").Router()

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//CRUD
router.post("/register",upload.single('image'),async (req,res)=>{
    try {

        const {firstName,lastName,email,password,repeatedPassword} = req.body
        const image = req.file;

        const payload = await userManager.register(firstName,lastName,email,password,repeatedPassword,image)

        res.status(201).json(payload)
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
router.post("/login",async (req,res)=>{
    try {

        const {email,password} = req.body
        const payload = await userManager.login(email,password)
        res.status(201).json(payload)
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
router.get("/userInfo/:userId?",isAuth,async (req,res)=>{
    try {

        let {userId} = req.params
        if(!userId){
            userId = req.user._id
        }

        await userManager.getUserInfo(userId,res)

        res.status(201).json(res.body)
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
router.get("/useExpMultiplier",isAuth,async (req,res)=>{
    try {

        let {_id} = req.user

        await userManager.useExpMultiplier(_id,1.5)

        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
router.get("/getSubscriptionPlansInfo",async (req,res)=>{
    try {
        res.status(200).json({plans:utils.plansInfo})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

module.exports = router