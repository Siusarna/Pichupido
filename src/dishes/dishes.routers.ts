import Router from 'koa-joi-router';
import { checkAccess } from '../middlewares/checkAccess';
import checkAuth from '../middlewares/checkAuth';
import * as DishesValidator from './dishes.validators';
import * as DishesConroller from './dishes.conrollers';

const dishesRouter = Router();

dishesRouter.get(
  '/restaurants/:restaurantId/dishes/:id',
  DishesValidator.getDishById,
  DishesConroller.getDishById,
);

dishesRouter.get(
  '/restaurants/:restaurantId/dishes',
  DishesValidator.getDishesByRestaurant,
  DishesConroller.getDishesByRestaurant,
);

dishesRouter.post(
  '/restaurants/:restaurantId/dishes',
  DishesValidator.createDish,
  checkAuth,
  checkAccess('admin'),
  DishesConroller.createDish,
);

dishesRouter.put(
  '/restaurants/:restaurantId/dishes/:id',
  DishesValidator.updateDish,
  checkAuth,
  checkAccess('admin'),
  DishesConroller.updateDish,
);

dishesRouter.delete(
  '/restaurants/:restaurantId/dishes/:id',
  DishesValidator.deleteDish,
  checkAuth,
  checkAccess('admin'),
  DishesConroller.deleteDish,
);


export default dishesRouter;
