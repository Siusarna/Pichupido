import * as queries from './orders.queries';
import { getTableById } from '../tables/tables.queries';
import { Order, OrderStatus } from './orders.types';
import { getDishById } from '../dishes/dishes.queries';
import { stripe } from '../libs/stripe';

export const createOrder = async (order: Order): Promise<{ clientSecret: string | null, orderId: number }> => {
  const table = await getTableById(order.tableId);
  if (!table) {
    throw ('Table with this id doesn\'t found');
  }
  const promises = order.cart.dishes.map(async (dish) => {
    const dishFromDb = await getDishById(dish.id);
    if (!dishFromDb) {
      throw ('Dish with this id doesn\'t found');
    }
  });
  await Promise.all(promises);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const configForPaymentIntent: stripe.PaymentIntentCreateParams = {
    amount: order.paid * 100,
    currency: 'uah',
  };

  const paymentIntent = await stripe.paymentIntents.create(configForPaymentIntent);
  const savedOrder = await queries.insertOrder({
    stripePaymentIntentId: paymentIntent.id,
    ...order,
  });

  order.stripePaymentIntentId = paymentIntent.id;

  const { client_secret: clientSecret } = paymentIntent;
  return { clientSecret, orderId: savedOrder.id };
};

export const confirmOrder = async (orderId: number): Promise<void> => {
  const order = await queries.getOrderById(orderId);
  if (!order || !order.stripePaymentIntentId) throw('The order for payment confirmation does not exist');

  const paymentIntent = await stripe.paymentIntents.retrieve(order.stripePaymentIntentId);
  if (paymentIntent.status !== 'succeeded') {
    throw('The Order\'s payment was not succeeded');
  }

  await queries.updateOrder({ status: OrderStatus.WAITING_FOR_SERVING }, orderId);
};
