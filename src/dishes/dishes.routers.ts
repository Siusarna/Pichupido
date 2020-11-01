import Router from 'koa-joi-router';
import { checkAccess } from '../middlewares/checkAccess';
import checkAuth from '../middlewares/checkAuth';
import * as DishesValidator from './dishes.validators';
import * as DishesConroller from './dishes.conrollers';

const dishesRouter = Router();

dishesRouter.get(
  '/dishes/:id',
  DishesValidator.getDishById,
  DishesConroller.getDishById,
);

dishesRouter.get(
  '/dishes/restaurants/:restaurantId',
  DishesValidator.getDishesByRestaurant,
  DishesConroller.getDishesByRestaurant,
);

dishesRouter.get(
  '/dishes/restaurants/:restaurantId/active',
  DishesValidator.getActiveDishesByRestaurant,
  DishesConroller.getActiveDishesByRestaurant,
);

dishesRouter.get(
  '/dishes/sections/:sectionId',
  DishesValidator.getDishesBySection,
  DishesConroller.getDishesBySection,
);

dishesRouter.get(
  '/dishes/sections/:sectionId/active',
  DishesValidator.getActiveDishesBySection,
  DishesConroller.getActiveDishesBySection,
);

dishesRouter.post(
  '/dishes',
  DishesValidator.createDish,
  checkAuth,
  checkAccess('admin'),
  DishesConroller.createDish,
);

dishesRouter.put(
  '/dishes/:id',
  DishesValidator.updateDish,
  checkAuth,
  checkAccess('admin'),
  DishesConroller.updateDish,
);

dishesRouter.delete(
  '/dishes/:id',
  DishesValidator.deleteDish,
  checkAuth,
  checkAccess('admin'),
  DishesConroller.deleteDish,
);


export default dishesRouter;
