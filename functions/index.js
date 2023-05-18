const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const {STRIPE_SECRET_KEY} = require('./.env');
const cors = require('cors');
const express = require('express');
const stripe = Stripe(STRIPE_SECRET_KEY);

admin.initializeApp();

const app = express();

const corsOptions = {
  origin: 'https://christopherdrake.github.io',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/createPaymentIntent', async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.json({clientSecret: paymentIntent.client_secret});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to create payment intent'});
  }
});

exports.createPaymentIntent = functions.https.onRequest(app);
