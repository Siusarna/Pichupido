import { Middleware } from 'koa';
import * as RestaurantsServices from './restaurants.service';

export const getRestaurant: Middleware = async (ctx) => {
  try {
    ctx.body = await RestaurantsServices.getRestaurant(ctx.params.id);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getAllRestaurants: Middleware = async (ctx) => {
  try {
    ctx.body = await RestaurantsServices.getAllRestaurants();
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const createRestaurant: Middleware = async (ctx) => {
  try {
    const id = await RestaurantsServices.createRestaurant(ctx.request.body, ctx.state.user.id);
    ctx.body = { id };
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const updateRestaurant: Middleware = async (ctx) => {
  try {
    ctx.body = await RestaurantsServices.updateRestaurant(ctx.request.body, ctx.state.user.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteRestaurant: Middleware = async (ctx) => {
  try {
    RestaurantsServices.deleteRestaurant(ctx.state.user.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};


