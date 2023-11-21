
const router = require("express").Router()
const utils = require("../utils/utils")
const bodyParser = require("body-parser");

const stripe = require('stripe')(utils.stripeSecretKey);


router.use(bodyParser.raw({ type: 'application/json' }));

router.post('/create-checkout-session', async (req, res) => {
    try {

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
                        itemID: "itemID",
                    },
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: `http://www.example.com`,
            cancel_url: `http://www.example.com`,
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
            console.log("----------------")
            console.log(req.body.data.object.metadata)
        }
        //
        // const endpointSecret = 'whsec_6b16e96c005c64b9a971240a119f9b2bf16ba7c0347c51f262051d73c5e0bbd6';
        // const payload = req.body;
        // const sig = req.headers['stripe-signature'];
        //
        // const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        // const session = event.data.object;
        // const itemID = session.metadata.itemID;

        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})

module.exports = router