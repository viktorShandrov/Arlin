const router = require("express").Router()
const chapterController = require("./controllers/chapterController")
const userController = require("./controllers/userController")
const bookController = require("./controllers/bookController")


router.use("/chapters",chapterController)
router.use("/users",userController)
router.use("/books",bookController)


module.exports = router