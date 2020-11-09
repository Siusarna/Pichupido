import { Middleware } from 'koa';
import * as OrdersServices from './orders.service';

export const createOrder: Middleware = async (ctx) => {
  const { body } = ctx.request;
  try {
    ctx.body = await OrdersServices.createOrder({
      kitchenNotes: body.kitchenNotes,
      paymentMethod: body.paymentMethod,
      paid: body.price,
      tableId: body.tableId,
      cart: body.cart,
    });
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const confirmOrder: Middleware = async (ctx) => {
  const { orderId } = ctx.request.params;
  try {
    ctx.status = 204;
    ctx.body = await OrdersServices.confirmOrder( Number(orderId) );
  } catch (e) {
    ctx.throw(400, e);
  }
};
