import config from 'config';
import Stripe from 'stripe';

export const stripe = new Stripe(config.get('stripe.secretKey'), {
  typescript: true,
  apiVersion: '2020-08-27',
});

