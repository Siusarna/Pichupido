import Router from 'koa-joi-router';
import { checkAccess } from '../middlewares/checkAccess';
import checkAuth from '../middlewares/checkAuth';
import * as MenuValidator from './menu.validators';
import * as MenuConroller from './menu.conrollers';

const menuRouter = Router();

menuRouter.get(
  '/restaurants/:restaurantId/menus',
  MenuValidator.getMenusByRestaurant,
  MenuConroller.getMenusByRestaurant,
);

menuRouter.get(
  '/restaurants/:restaurantId/menus/:id',
  MenuValidator.getMenu,
  MenuConroller.getMenu,
);

menuRouter.post(
  '/restaurants/:restaurantId/menus/',
  MenuValidator.createMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.createMenu,
);

menuRouter.put(
  '/restaurants/:restaurantId/menus/:id',
  MenuValidator.updateMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.updateMenu,
);

menuRouter.delete(
  '/restaurants/:restaurantId/menus/:id',
  MenuValidator.deleteMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.deleteMenu,
);

menuRouter.put(
  '/restaurants/:restaurantId/menus/:id/activate',
  MenuValidator.activateMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.activateMenu,
);


menuRouter.put(
  '/restaurants/:restaurantId/menus/:id/deactivate',
  MenuValidator.deactivateMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.deactivateMenu,
);



export default menuRouter;
