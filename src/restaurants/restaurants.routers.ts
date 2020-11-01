import Router from 'koa-joi-router';
import { checkAccess } from '../middlewares/checkAccess';
import checkAuth from '../middlewares/checkAuth';
import * as RestaurantsValidator from './restaurants.validators';
import * as RestaurantsConroller from './restaurants.conrollers';

const restaurantsRouter = Router();

restaurantsRouter.get(
  '/restaurants',
  RestaurantsValidator.getAllRestaurants,
  RestaurantsConroller.getAllRestaurants,
);

restaurantsRouter.get(
  '/restaurants/:id',
  RestaurantsValidator.getRestaurant,
  RestaurantsConroller.getRestaurant,
);

restaurantsRouter.post(
  '/restaurants/',
  RestaurantsValidator.createRestaurant,
  checkAuth,
  checkAccess('admin'),
  RestaurantsConroller.createRestaurant,
);

restaurantsRouter.put(
  '/restaurants/:id',
  RestaurantsValidator.updateRestaurant,
  checkAuth,
  checkAccess('admin'),
  RestaurantsConroller.updateRestaurant,
);

restaurantsRouter.delete(
  '/restaurants/:id',
  RestaurantsValidator.deleteRestaurant,
  checkAuth,
  checkAccess('admin'),
  RestaurantsConroller.deleteRestaurant,
);


export default restaurantsRouter;
