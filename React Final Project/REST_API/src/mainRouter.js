const router = require("express").Router()
const chapterController = require("./controllers/chapterController")
const userController = require("./controllers/userController")
const bookController = require("./controllers/bookController")
const wordController = require("./controllers/wordController")
const stripeController = require("./controllers/stripeController")
const newsController = require("./controllers/newsController")
const thirdPartyAuthController = require("./controllers/thirdPartyAuthController")


router.use("/chapters",chapterController)
router.use("/users",userController)
router.use("/books",bookController)
router.use("/unknownWords",wordController)
router.use("/stripe",stripeController)
router.use("/news",newsController)
router.use("/thirdPartyAuth",thirdPartyAuthController)


module.exports = router