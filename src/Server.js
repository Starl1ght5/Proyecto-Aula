require('dotenv').config();
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = express()
const port = 4242;
const cors = require('cors');


router.use(cors());
router.use(express.json());
router.post("/create-checkout-session", async(req, res) => {

    const products = req.body.client.user_cart;

    const lineItems = products.map( (product) => ({
        price_data: {
            currency: "COP",
            product_data: {
                name: product.name
            },
            unit_amount: parseInt(product.price + "00")
        },
        quantity: product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/decline"
    });

    res.json({id: session.id})

})

router.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });