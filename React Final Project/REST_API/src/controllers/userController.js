const {isAuth} = require("../utils/authentication");
const chapterManager = require("../managers/chapterManager");
const userManager = require("../managers/userManager");
const router = require("express").Router()

//CRUD
router.post("/register",async (req,res)=>{
    try {

        const {email,password,repeatedPassword} = req.body
        console.log(req.body)

        const payload = await userManager.register(email,password,repeatedPassword)

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

module.exports = router