import Router from 'koa-joi-router';
import { checkAccess } from '../middlewares/checkAccess';
import checkAuth from '../middlewares/checkAuth';
import * as TablesValidator from './tables.validators';
import * as TablesControllers from './tables.controllers';

const tablesRouter = Router();

tablesRouter.get(
  '/restaurants/:restaurantId/tables',
  TablesValidator.getTablesByRestaurant,
  TablesControllers.getTablesByRestaurant,
);

tablesRouter.get(
  '/tables/:id',
  TablesValidator.getTable,
  TablesControllers.getTable,
);

tablesRouter.post(
  '/tables/',
  TablesValidator.createTable,
  checkAuth,
  checkAccess('admin'),
  TablesControllers.createTable
);

tablesRouter.delete(
  '/tables/:id',
  TablesValidator.deleteTable,
  checkAuth,
  checkAccess('admin'),
  TablesControllers.deleteTable
);

export default tablesRouter;
