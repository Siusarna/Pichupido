import * as Router from 'koa-joi-router';
import { PaymentMethod } from './orders.types';

const joi = Router.Joi;

const allowedPaymentMethods = [
  PaymentMethod.CREDIT_CARD,
  PaymentMethod.CASH,
];

const cartSchema = {
  dishes: joi.array().items({
    id: joi.number().integer().positive().required(),
    amount: joi.number().integer().positive().required(),
    price: joi.number().positive().required(),
    name: joi.string().required(),
  }),
};

export const createOrder: Router.Config = {
  meta: {
    swagger: {
      summary: 'Create order',
      tags: ['orders'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number(),
    },
    type: 'json',
    body: {
      kitchenNotes: joi.string().empty(''),
      tableId: joi.number().integer().positive().required(),
      cart: joi.object(cartSchema).required(),
      paymentMethod: joi.string().valid(allowedPaymentMethods).required(),
      price: joi.number().positive().required(),
    },
    output: {
      201: {
        body: {
          clientSecret: joi.string().required(),
          orderId: joi.number().required(),
        },
      },
      400: {
        body: {
          error: joi.string(),
        },
      },
    },
  },
};

export const confirmOrder: Router.Config = {
  meta: {
    swagger: {
      summary: 'Confirm that payment is ok',
      description: 'Confirm that payment is ok',
      tags: ['orders'],
    },
  },
  validate: {
    params: {
      orderId: joi.string().required(),
      restaurantId: joi.number(),
    },
    output: {
      204: {
        body: {},
      },
    },
  },
};

