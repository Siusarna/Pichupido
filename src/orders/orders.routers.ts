import Router from 'koa-joi-router';
import * as OrdersValidator from './orders.validators';
import * as OrdersController from './orders.conrollers';

const ordersRouter = Router();

ordersRouter.post(
  '/orders',
  OrdersValidator.createOrder,
  OrdersController.createOrder,
);
ordersRouter.post(
  '/orders/:orderId/confirm',
  OrdersValidator.confirmOrder,
  OrdersController.confirmOrder,
);


export default ordersRouter;
