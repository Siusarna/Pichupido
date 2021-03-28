import Router from 'koa-joi-router';
import * as OrdersValidator from './orders.validators';
import * as OrdersController from './orders.conrollers';

const ordersRouter = Router();

ordersRouter.post(
  '/restaurants/:restaurantId/orders',
  OrdersValidator.createOrder,
  OrdersController.createOrder,
);
ordersRouter.post(
  '/restaurants/:restaurantId/orders/:orderId/confirm',
  OrdersValidator.confirmOrder,
  OrdersController.confirmOrder,
);
ordersRouter.post(
  '/delay',
  OrdersValidator.delay,
  OrdersController.delay,
);


export default ordersRouter;
