const utils = require("../utils/utils");
const allModels = require("../models/allModels");



exports.createBookStripeProduct = async (book)=>{
    return exports.createStripeProduct(
        book.name,
        book.priceInCents,
        book.image
    )
}


exports.createStripeProduct=async(name,priceInCents,image=null,interval=null,subscriptionType=null)=>{


    const product = await utils.stripe.products.create({
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

    const price = await utils.stripe.prices.create(priceData);

    const productData ={
        metadata: {
            priceId: price.id,
        },
    }
    if(subscriptionType){
        productData.metadata.subscriptionType = subscriptionType
    }

    await utils.stripe.products.update(product.id, productData);
    return {
        product,
        priceId:price.id
    }
}


exports.deleteProduct = async (productId) => {
    try {
        const product = await utils.stripe.products.update(productId, {
            active:false
        });
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

exports.getProductById = async (productId)=> {
    try {
        return await utils.stripe.products.retrieve(productId);
    } catch (error) {
        console.error('Error retrieving product:', error);
        return null; // Return null if product retrieval fails
    }
}

exports.createSession = async (bookId,userId)=>{
    const book = await allModels.bookModel.findById(bookId)
    const session = await utils.stripe.checkout.sessions.create({
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
        success_url: `${utils.FEdomains[0]}/#/main/AllBooks/${bookId}`,
        cancel_url: `${utils.FEdomains[0]}/#/main/AllBooks/${bookId}`,
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        // the actual Session ID is returned in the query parameter when your customer
        // is redirected to the success page.
    });
    return session
}


exports.createSubscription=async(userId,stripeSubscriptionPriceId,subscriptionType)=> {

        // Create a customer
        const customers = await utils.stripe.customers.list();

        let customer = customers.data.find(cust => cust.metadata.userId === userId)
        if(!customer){
            customer = await utils.stripe.customers.create({
                metadata: {
                    userId: userId,
                },
            });
        }



        const session = await utils.stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['card'],
            line_items: [{
                price: stripeSubscriptionPriceId,
                quantity: 1,
            }],
            mode: 'subscription',
            metadata: {
               userId,
                subscriptionType

            },
            success_url: `${utils.FEdomains[0]}/#/main/AllBooks`,
            cancel_url: `${utils.FEdomains[0]}/#/main/AllBooks`,
        });
        return session;

        return subscription;

}