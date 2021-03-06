import Router from 'koa-joi-router';
import checkAuth from '../middlewares/checkAuth';
import { AccountsController } from './accounts.controllers';
import { AccountsValidator } from './accounts.validators';

const accountsRouter = Router();

accountsRouter.post(
  '/accounts/sign-in',
  AccountsValidator.signIn,
  AccountsController.signIn,
);

accountsRouter.post(
  '/accounts/sign-up',
  AccountsValidator.signUp,
  AccountsController.signUp,
);

accountsRouter.get(
  '/accounts/profile',
  AccountsValidator.getProfile,
  checkAuth,
  AccountsController.profile
);

accountsRouter.put(
  '/accounts/profile',
  AccountsValidator.updateProfile,
  checkAuth,
);

accountsRouter.delete(
  '/accounts/profile',
  AccountsValidator.deleteProfile,
  checkAuth,
  AccountsController.deleteProfile
);

accountsRouter.post(
  '/accounts/logout',
  AccountsValidator.logout,
  checkAuth,
);


export default accountsRouter;
