import Router from 'koa-joi-router';
import passport from 'koa-passport';
import { AccountsController } from './accounts.controllers';
import { AccountsValidator } from './accounts.validators';

const accountsRouter = Router();

accountsRouter.post(
  '/accounts/sign-in',
  AccountsValidator.signIn,
  passport.authenticate('local', { session: false }),
  AccountsController.signIn,
);

export default accountsRouter;
