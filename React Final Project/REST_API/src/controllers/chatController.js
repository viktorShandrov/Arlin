const {isAuth} = require("../utils/authentication");
const chatManager = require("../managers/chatManager");
const router = require("express").Router()

//CRUD
router.post("/getResponse",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {question} = req.body

       const data =  await chatManager.getAnswer(question)
        setTimeout(()=>{

        },1000)
         res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})


module.exports = router