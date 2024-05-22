const {isAuth} = require("../utils/authentication");
const newsManager = require("../managers/newsManager");
const router = require("express").Router()





//CRUD

router.get("/all",async (req,res)=>{
    try{
        const news = await newsManager.getAll()
        res.status(200).json({news})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/paginated/:startIndex",async (req,res)=>{
    try{
        const {startIndex} = req.params
        const news = await newsManager.getPaginated(startIndex)
        res.status(200).json({news})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/topNews",async (req,res)=>{
    try{
        const news = await newsManager.getTopNews()
        res.status(200).json(news)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/:id",async (req,res)=>{
    try{
        const {id} = req.params
        const news = await newsManager.get(id)
        res.status(200).json({news})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports = router
