const router = require("express").Router()
const chapterController = require("./controllers/chapterController")
const userController = require("./controllers/userController")
const bookController = require("./controllers/bookController")
const wordController = require("./controllers/wordController")
const stripeController = require("./controllers/stripeController")
const newsController = require("./controllers/newsController")
const thirdPartyAuthController = require("./controllers/thirdPartyAuthController")
const chatController = require("./controllers/chatController")


router.use("/chapters",chapterController)
router.use("/users",userController)
router.use("/books",bookController)
router.use("/unknownWords",wordController)
router.use("/stripe",stripeController)
router.use("/news",newsController)
router.use("/thirdPartyAuth",thirdPartyAuthController)
router.use("/chat",chatController)


module.exports = router