import { Middleware } from 'koa';
import * as OrdersServices from './orders.service';
import { Kafka } from 'kafkajs';
import { config } from '../libs/kafkaConfig';

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


export const delay:Middleware = async (ctx) => {
  const { email, phone } = ctx.request.body;
  try {
    // 1.Instantiating kafka
    const kafka = new Kafka(config);
    // 2.Creating Kafka Producer
    const producer = kafka.producer();
    const message = {
      email,
      phone,
      message: "Test kafka broker"
    }
    // 3.Connecting producer to kafka broker.
    await producer.connect()
    await producer.send({
      topic: 'email-message-topic',
      messages:
        [{ value: JSON.stringify(message) }],
    })
    await producer.send({
      topic: 'phone-message-topic',
      messages:
        [{ value: JSON.stringify(message) }],
    })
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};
