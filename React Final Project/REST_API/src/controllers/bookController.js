const {isAuth} = require("../utils/authentication");
const bookManager = require("../managers/bookManager");
const router = require("express").Router()

//CRUD
router.post("/create",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {bookName,image} = req.body

       const book =  await bookManager.createBook(bookName,image,_id)
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/:id",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        await bookManager.getBook(bookId,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/all",async (req,res)=>{
    try{
        const allBooks = await bookManager.getAllBooks()
        res.status(200).json({allBooks})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.post("/:id/edit",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        const {bookName,image} = req.body
        await bookManager.editBook(bookId,bookName,image,_id)
        res.status(200).end()
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