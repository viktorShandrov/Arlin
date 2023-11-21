const router = require("express").Router()
const chapterController = require("./controllers/chapterController")
const userController = require("./controllers/userController")
const bookController = require("./controllers/bookController")
const wordController = require("./controllers/wordController")
const stripeController = require("./controllers/stripeController")


router.use("/chapters",chapterController)
router.use("/users",userController)
router.use("/books",bookController)
router.use("/unknownWords",wordController)
router.use("/stripe",stripeController)


module.exports = router