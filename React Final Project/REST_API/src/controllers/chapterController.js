const {isAuth} = require("../utils/authentication");
const chapterManager = require("../managers/chapterManager");
const router = require("express").Router()

//CRUD
router.post("/create",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {bookId,text} = req.body

        await chapterManager.createChapter(bookId,text,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/:id",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const chapterId = req.params.id
        const  chapter = await chapterManager.getChapter(chapterId,_id)
        res.status(200).json(chapter)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.post("/:id/edit",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const chapterId = req.params.id
        const {bookId,text} = req.body
        await chapterManager.editChapter(chapterId,bookId,text,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.post("/:id/delete",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const chapterId = req.params.id

        await chapterManager.deleteChapter(chapterId,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports = router