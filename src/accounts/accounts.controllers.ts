import { Context } from 'koa';

export class AccountsController {
  static async signIn(ctx: Context) {
    if (!ctx.state.user.isActivatedEmail) {
      ctx.throw(402, 'Your email is not activated.');
    }
    ctx.body = await ctx.state.user.getAuthData();
  }
}
