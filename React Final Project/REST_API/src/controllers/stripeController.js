
const router = require("express").Router()
const utils = require("../utils/utils")
const bodyParser = require("body-parser");
const bookManager = require("../managers/bookManager");
const {isAuth} = require("../utils/authentication");

const stripe = require('stripe')(utils.stripeSecretKey);


router.use(bodyParser.raw({ type: 'application/json' }));

router.post('/create-checkout-session',isAuth, async (req, res) => {
    try {
        const {_id} = req.user
        const {bookId} = req.body

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: "price_1OEx4LAPrNaPFyVRASMt7kdw",
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
                    metadata: {
                        bookId,
                        userId:_id
                    },
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: `${utils.FEdomains[0]}/main/read`,
            cancel_url: `${utils.FEdomains[0]}/main/read`,
        });


        res.json({ id: session.id });

    }catch (error) {
        console.log(error);
        res.status(400).json({message:error.message})
    }
})







router.post("/stripeWebhook",async (req,res)=>{
    try {
        const {type} = req.body
        if(type==="checkout.session.completed"){
            const {bookId,userId} = req.body.data.object.metadata
            console.log(bookId,userId)
            await bookManager.bookIsPurchased(userId,bookId)
        }


        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

module.exports = router