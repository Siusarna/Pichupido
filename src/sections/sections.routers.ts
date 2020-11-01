import Router from 'koa-joi-router';
import { checkAccess } from '../middlewares/checkAccess';
import checkAuth from '../middlewares/checkAuth';
import * as SectionsValidator from './sections.validators';
import * as SectionsControllers from './sections.controllers';

const sectionsRouter = Router();

sectionsRouter.get(
  '/restaurants/:restaurantId/sections',
  SectionsValidator.getSectionByRestaurant,
  SectionsControllers.getSectionByRestaurant,
);

sectionsRouter.get(
  '/sections/:id',
  SectionsValidator.getSection,
  SectionsControllers.getSection,
);

sectionsRouter.post(
  '/sections/',
  SectionsValidator.createSection,
  checkAuth,
  checkAccess('admin'),
  SectionsControllers.createSection
);

sectionsRouter.put(
  '/sections/:id',
  SectionsValidator.updateSection,
  checkAuth,
  checkAccess('admin'),
  SectionsControllers.updateSection
);

sectionsRouter.delete(
  '/sections/:id',
  SectionsValidator.deleteSection,
  checkAuth,
  checkAccess('admin'),
  SectionsControllers.deleteSection
);


export default sectionsRouter;
