const {isAuth} = require("../utils/authentication");
const wordManager = require("../managers/wordManager");
const router = require("express").Router()

//CRUD
router.post("/create",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {words} = req.body
        const info = await wordManager.createWords(words,_id,res)
        res.status(200).json(info.length>0?{info}:{})
    } catch (error) {
        console.log(error)
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
        const wordId = req.params.id

        await wordManager.deleteWord(wordId,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.post("/makeThemKnown",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {wordsIds}= req.body

        await wordManager.makeThemKnown(wordsIds,_id)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
const giveTestRoute = async (req,res)=>{
    try{
        const {_id} = req.user
        const {chapterId,isExercise} = req.body
        const test =  await wordManager.generateTest(_id,chapterId,isExercise)
        res.status(200).json({test})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}
giveTestRoute.config = {
    api: {
        externalResolver: true,
        timeout: 60, // Set the timeout for this function (in seconds)
    },
};
router.post("/giveTest",isAuth,giveTestRoute)
router.post("/testCompleted",isAuth,async (req,res)=>{
    try{
        const {_id} = req.user
        const {results,testId} = req.body
        await wordManager.markTestAsCompleted(_id,res,results,testId)
        res.status(200).json({...res.body})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

router.get("/testDetails/:testId",isAuth,async (req,res)=>{
    try{
        const {testId} = req.params
        const testDetails = await wordManager.getTestDetails(testId)
        res.status(200).send({testDetails})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

router.post("/translateText",isAuth,async (req,res)=>{
    try{
        const {text} = req.body
        const translation = await wordManager.translateText(text)
        res.status(200).send({translation})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
router.get("/giveSentenceWhereWordCanBeUsed/:word",async (req,res)=>{
    try{
        const {word} = req.params
        const sentence = await wordManager.giveSentence(word)
        res.status(200).send({sentence})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.post("/createWordContainer",async (req,res)=>{
    try{
        const {colorCode, name} = req.body
        const container = await wordManager.createWordContainer(req.user,colorCode,name)
        res.status(200).end()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
router.get("/getWordContainers/:withPopulatedWords?",async (req,res)=>{
    try{
        const {withPopulatedWords} = req.params
        const containers = await wordManager.getUserWordContainer(req.user,withPopulatedWords)
        res.status(200).json({containers})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports = router