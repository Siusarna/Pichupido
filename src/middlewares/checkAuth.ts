import jwt from 'jsonwebtoken';
import config from 'config';
import Koa, { Middleware } from 'koa';

import { AccessToken, JwtConfig, RefreshToken } from '../tokens/tokens.types';
import { getUserById } from '../accounts/accounts.queries';
import { createAndUpdateTokens } from '../tokens';
import { getRestaurantByUserId } from '../restaurants/restaurants.queries';

const jwtConfig: JwtConfig = config.get('tokens');

const setTokens = (ctx: Koa.Context, tokens: { accessToken: string, refreshToken: string }): void => {
  const { accessToken, refreshToken } = tokens;
  ctx.cookies.set('accessToken', accessToken, { maxAge: jwtConfig.accessExpiresIn });
  ctx.cookies.set('refreshToken', refreshToken, { maxAge: jwtConfig.refreshExpiresIn });
};

const processingRefreshToken = (refreshToken: string): Koa.Middleware => async(ctx, next) => {
  if (!refreshToken) {
    return ctx.throw(401, 'Tokens expired, please log in again');
  }
  let payload: RefreshToken;
  try {
    payload = jwt.verify(refreshToken, jwtConfig.refreshSecret) as RefreshToken;
    if (payload.type !== 'refresh') {
      return ctx.throw(400, 'Invalid token, please log in again');
    }
  } catch (e) {
    return ctx.throw(400, 'Invalid token, please log in again');
  }
  const tokens = await createAndUpdateTokens(payload.userId);
  ctx.state.tokens = tokens;
  setTokens(ctx as Koa.Context, tokens);
  return next();
};

const checkAuth: Middleware = async (ctx, next) => {
  if (!ctx.cookies) {
    return ctx.throw(400, 'Unauthorized');
  }
  const accessToken = ctx.cookies.get('accessToken') || ctx.request.headers.accesstoken;
  const refreshToken = ctx.cookies.get('refreshToken') || ctx.request.headers.refreshtoken;
  if (!accessToken) {
    return processingRefreshToken(refreshToken)(ctx, next);
  }
  let payload: AccessToken;
  try {
    payload = jwt.verify(accessToken, jwtConfig.accessSecret) as AccessToken;
  } catch (e) {
    return processingRefreshToken(refreshToken)(ctx, next);
  }
  if (payload.type !== 'access') {
    return ctx.throw(400, 'Invalid token, please log in again');
  }
  const [user] = await getUserById(payload.userId);
  ctx.state.user = user;
  if (user.role === 'admin') {
    const restaurant = await getRestaurantByUserId(payload.userId);
    ctx.state.restaurant = restaurant;
  }
  return next();
};

export default checkAuth;