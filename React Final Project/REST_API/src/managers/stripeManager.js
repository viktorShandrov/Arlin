const utils = require("../utils/utils");
const allModels = require("../models/allModels");
const stripe = require('stripe')(utils.stripeSecretKey);



exports.createBookStripeProduct = async (book)=>{
    return exports.createStripeProduct(
        book.name,
        book.priceInCents,
        book.image
    )
}


exports.createStripeProduct=async(name,priceInCents,image=null,interval=null)=>{


    const product = await stripe.products.create({
        name,
        type: 'service',
        images: image?[image]:[],
    });

    const priceData = {
        product: product.id,
        unit_amount: priceInCents,
        currency: 'bgn',
    }

    if(interval){
        priceData.recurring = { // Details for recurring payments
            interval, // Interval for the recurring payment (e.g., month or year)
        }
    }

    const price = await stripe.prices.create(priceData);

    await stripe.products.update(product.id, {
        metadata: {
            priceId: price.id,
        },
    });
    return {
        product,
        priceId:price.id
    }
}


exports.deleteProduct = async (productId) => {
    try {
        const product = await stripe.products.update(productId, {
            active:false
        });
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

exports.getProductById = async (productId)=> {
    try {
        return await stripe.products.retrieve(productId);
    } catch (error) {
        console.error('Error retrieving product:', error);
        return null; // Return null if product retrieval fails
    }
}

exports.createSession = async (bookId,userId)=>{
    const book = await allModels.bookModel.findById(bookId)
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
            {
                price: book.stripePriceId,
                // For metered billing, do not pass quantity
                quantity: 1,
            },
        ],
        metadata: {
            bookId,
            userId
        },
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        // the actual Session ID is returned in the query parameter when your customer
        // is redirected to the success page.
        success_url: `${utils.FEdomains[0]}/#/main/AllBooks/${bookId}`,
        cancel_url: `${utils.FEdomains[0]}/#/main/AllBooks/${bookId}`,
    });
    return session
}


exports.createSubscription=async(userId)=> {

        // Create a customer
        const customers = await stripe.customers.list();

        let customer = customers.data.find(cust => cust.metadata.userId === userId)
        if(!customer){
            customer = await stripe.customers.create({
                metadata: {
                    userId: userId,
                },
            });
        }



        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['card'],
            line_items: [{
                price: "price_1OnJkoAPrNaPFyVRPUQvvQRv",
                quantity: 1,
            }],
            mode: 'subscription',
            metadata: {
               userId
            },
            success_url: `${utils.FEdomains[0]}/#/main/AllBooks`,
            cancel_url: `${utils.FEdomains[0]}/#/main/AllBooks`,
        });
        return session;

        return subscription;

}