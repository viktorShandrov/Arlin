const router = require("express").Router()
const chapterController = require("./controllers/chapterController")
const userController = require("./controllers/userController")
const bookController = require("./controllers/bookController")
const wordController = require("./controllers/wordController")
const stripeController = require("./controllers/stripeController")
const newsController = require("./controllers/newsController")
const thirdPartyAuthController = require("./controllers/thirdPartyAuthController")
const chatController = require("./controllers/chatController")
const userManager = require("./managers/userManager")
const userModel = require("./models/userModel")

router.use("/chapters",chapterController)
router.use("/users",userController)
router.use("/books",bookController)
router.use("/unknownWords",wordController)
router.use("/stripe",stripeController)
router.use("/news",newsController)
router.use("/thirdPartyAuth",thirdPartyAuthController)
router.use("/chat",chatController)
// router.use(checkForAdvancements)


async function checkForAdvancements(req,res,next){
    console.log("exe")
    const id = req.user?._id
    if(!id) next()

    const user = await userModel.findById(id)

    await userManager.checkIfAdvancements(user,res)
    next()
}


module.exports = router