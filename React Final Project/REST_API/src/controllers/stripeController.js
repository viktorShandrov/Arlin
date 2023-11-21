
const router = require("express").Router()
const utils = require("../utils/utils")

const stripe = require('stripe')(utils.stripeSecretKey);




router.post('/create-checkout-session', async (req, res) => {
    try {

        const session = await stripe.checkout.sessions.create({
            mode: 'purchase',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: "price_1OEx4LAPrNaPFyVRASMt7kdw",
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: `www.example.com`,
            cancel_url: `www.example.com`,
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
        // req.user = {
        //     _id:"6533c417dbc3bba0399573c8",
        //     rootId:"6533c417dbc3bba0399573ca"
        // }
        if(type==="customer.subscription.created"){
            await stripeManager.paymentIsSuccessful(req.user)
        }else if(type==="customer.subscription.deleted"){
            await stripeManager.paymentIsUnsuccessful(req.user)
        }

        res.status(200).end()
    } catch (error) {

        res.status(400).json({message:error.message})
    }
})

module.exports = router