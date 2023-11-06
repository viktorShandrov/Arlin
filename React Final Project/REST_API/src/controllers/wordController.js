const {isAuth} = require("../utils/authentication");
const wordManager = require("../managers/wordManager");
const router = require("express").Router()

//CRUD
router.post("/create",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {word} = req.body

       await wordManager.createWord(word,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/all",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user

        const words =  await wordManager.getAllWords(_id)
        res.status(200).json(words)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


router.post("/:id/delete",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id

        await bookManager.deleteBook(bookId,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports = router