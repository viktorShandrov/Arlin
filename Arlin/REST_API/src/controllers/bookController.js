const {isAuth} = require("../utils/authentication");
const bookManager = require("../managers/bookManager");
const router = require("express").Router()
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//CRUD
router.post("/create",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {bookData} = req.body
       const book =  await bookManager.createBook(bookData,_id)
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.post("/addImageToBook/:bookId",isAuth,upload.single('image'),async (req,res)=>{
    try{
        const {_id} = req.user
        const {bookId} = req.params
        const image = req.file;

        await bookManager.addImageToBook(bookId,_id,image)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/getDataForFilters",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user

        const payload = await bookManager.getFilteringData()
        res.status(200).json(payload)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/all",async (req,res)=>{
    try{
        const {_id} = req.user
        const allBooks = await bookManager.getAllBooks(_id)

        res.status(200).json({allBooks})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
router.get("/:id/details",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        const book = await bookManager.getBookDetails(bookId,_id)
        res.status(200).json({book})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

router.post("/:id/edit",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        const {bookData,image} = req.body
        await bookManager.editBook(bookId,bookData,_id)
        console.log("dddd")
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/:id/delete",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        console.log(bookId)
        await bookManager.deleteBook(bookId,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.post("/:id/writeReview",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        const {stars,text} = req.body
        await bookManager.writeReview(bookId,_id,stars,text)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/:id/addOrRemoveFromWishlist",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        const isWishedByUser = await bookManager.addOrRemoveFromWishlist(bookId,_id)
        res.status(200).json({isWishedByUser})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/:id/getForFree",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        await bookManager.getBookForFree(_id,bookId)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/:bookId/:reviewId/likeOrDislikeFeedback",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const reviewId = req.params.reviewId
        const bookId = req.params.bookId
        const isLikedByUser = await bookManager.likeOrDislikeFeedback(bookId,reviewId,_id)
        res.status(200).json({isLikedByUser})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
router.get("/:id",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const bookId = req.params.id
        const book = await bookManager.getBook(bookId,_id)
        res.status(200).json({book})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports = router
