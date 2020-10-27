import { Context } from 'koa';
import { AccountsServices } from './accounts.service';
import config from 'config';
import { JwtConfig } from '../tokens/tokens.types';

const jwtConfig: JwtConfig = config.get('tokens'); 

export class AccountsController {
  static async signIn(ctx: Context): Promise<void> {
    try {
      const { accessToken, refreshToken, user } = await AccountsServices.signIn(ctx.request.body);
      ctx.cookies.set('accessToken', accessToken, { maxAge: jwtConfig.accessExpiresIn });
      ctx.cookies.set('refreshToken', refreshToken, { maxAge: jwtConfig.refreshExpiresIn });
      ctx.body = { user };
    } catch (error) {
      return ctx.throw(400, error);
    }
  }

  static async signUp(ctx: Context): Promise<void> {
    try {
      ctx.body = await AccountsServices.signUp(ctx.request.body);
    } catch (error) {
      return ctx.throw(400, error);
    }
  }

  static async profile(ctx: Context): Promise<void> {
    try {
      ctx.body = await AccountsServices.profile(ctx.state.user);
    } catch (e) {
      return ctx.throw(e);
    }
  }
}