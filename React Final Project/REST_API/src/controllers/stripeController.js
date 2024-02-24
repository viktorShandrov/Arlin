
const router = require("express").Router()
const utils = require("../utils/utils")
const bodyParser = require("body-parser");
const bookManager = require("../managers/bookManager");
const {isAuth} = require("../utils/authentication");
const stripeManager = require("../managers/stripeManager");

const stripe = require('stripe')(utils.stripeSecretKey);


router.use(bodyParser.raw({ type: 'application/json' }));

router.post('/create-checkout-session',isAuth, async (req, res) => {
    try {
        const {_id} = req.user
        const {bookId} = req.body

        const session = await stripeManager.createSession(bookId,_id)


        res.status(200).json({ id: session.id });

    }catch (error) {
        console.log(error);
        res.status(400).json({message:error.message})
    }
})







router.post("/stripeWebhook",async (req,res)=>{
    try {
        const {type} = req.body
        console.log(type)
        if(type==="checkout.session.completed"){
            const {bookId,userId} = req.body.data.object.metadata
            await bookManager.bookIsPurchased(userId,bookId)
        }


        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

module.exports = router