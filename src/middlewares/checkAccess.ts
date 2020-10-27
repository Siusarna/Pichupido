import { Middleware } from "koa";

export const checkAccess:  ((role: string) => Middleware) = role => async (ctx, next) => {
  if (ctx.state.user.role !== role) {
    return ctx.throw(403, `You must login as ${role} for doing this`);
  }
  return next();
};

