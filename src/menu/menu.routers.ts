import Router from 'koa-joi-router';
import { checkAccess } from '../middlewares/checkAccess';
import checkAuth from '../middlewares/checkAuth';
import * as MenuValidator from './menu.validators';
import * as MenuConroller from './menu.conrollers';

const menuRouter = Router();

menuRouter.get(
  '/restaurants/:restaurantId/menu',
  MenuValidator.getMenusByRestaurant,
  MenuConroller.getMenusByRestaurant,
);

menuRouter.get(
  '/menu/:id',
  MenuValidator.getMenu,
  MenuConroller.getMenu,
);

menuRouter.post(
  '/menu/',
  MenuValidator.createMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.createMenu,
);

menuRouter.put(
  '/menu/:id',
  MenuValidator.updateMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.updateMenu,
);

menuRouter.delete(
  '/menu/:id',
  MenuValidator.deleteMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.deleteMenu,
);

menuRouter.put(
  '/menu/:id/activate',
  MenuValidator.activateMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.activateMenu,
);


menuRouter.put(
  '/menu/:id/deactivate',
  MenuValidator.deactivateMenu,
  checkAuth,
  checkAccess('admin'),
  MenuConroller.deactivateMenu,
);



export default menuRouter;
