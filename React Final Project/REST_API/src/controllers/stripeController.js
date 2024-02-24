
const router = require("express").Router()
const utils = require("../utils/utils")
const bodyParser = require("body-parser");
const bookManager = require("../managers/bookManager");
const userManager = require("../managers/userManager");
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
router.post('/create-subscription-checkout-session',isAuth, async (req, res) => {
    try {
        const {_id} = req.user


        const session = await stripeManager.createSubscription(_id)


        res.status(200).json({ id: session.id });

    }catch (error) {
        console.log(error);
        res.status(400).json({message:error.message})
    }
})







router.post("/stripeWebhook",async (req,res)=>{
    try {
        const {type} = req.body

        const {bookId,userId} = req.body.data.object.metadata


        switch (type) {
            case 'checkout.session.completed':
                if(req.body.data.object.mode==="subscription"){
                    await userManager.userSubscribedEventHandler(userId)
                }else{
                    await bookManager.bookIsPurchased(userId,bookId)
                }

                break;
            case 'customer.subscription.deleted':
                const customerId = req.body.data.object.customer
                const customer = await stripe.customers.retrieve(customerId);
                await userManager.userUnsubscribedEventHandler(customer.metadata.userId)
                break;
            case 'invoice.payment_failed':
                const customerId_1 = req.body.data.object.customer
                const customer_1 = await stripe.customers.retrieve(customerId_1);
                await userManager.userUnsubscribedEventHandler(customer_1.metadata.userId)
                break;
            // case 'customer.subscription.paused':
            //     const customerId_1 = req.body.data.object.customer
            //     const customer_1 = await stripe.customers.retrieve(customerId_1);
            //     await userManager.userUnsubscribedEventHandler(customer_1.metadata.userId)
            //     break;
            // case 'customer.subscription.resumed':
            //     const customerId_2 = req.body.data.object.customer
            //     const customer_2 = await stripe.customers.retrieve(customerId_2);
            //     await userManager.userSubscribedEventHandler(customer_2.metadata.userId)
            //     break;
            // case 'customer.subscription.updated':
            //     break;
            default:
                console.log(`Unhandled event type ${type}`);
        }



        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

module.exports = router