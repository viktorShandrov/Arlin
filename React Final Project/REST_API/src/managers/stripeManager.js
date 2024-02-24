const utils = require("../utils/utils");
const stripe = require('stripe')(utils.stripeSecretKey);



exports.createBookStripeProduct = async (book)=>{
    const product = await stripe.products.create({
        name: book.name,
        type: 'service',
        images: [book.image],

    });

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 699, // Amount in cents
        currency: 'bgn',
        // No recurring field for one-time purchase
    });

    await stripe.products.update(product.id, {
        metadata: {
            priceId: price.id,
        },
    });
    return product
}


exports.deleteProduct = async (productId) => {
    try {
        const response = await fetch(`https://api.stripe.com/v1/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${utils.stripeSecretKey}`,
            },
        });

    } catch (error) {
        console.error('Error deleting product:', error);
    }
};