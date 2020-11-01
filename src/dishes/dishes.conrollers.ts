import { Middleware } from 'koa';
import * as DishesServices from './dishes.service';

export const getDishById: Middleware = async (ctx) => {
  try {
    ctx.body = await DishesServices.getDishById(ctx.params.id);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getDishesByRestaurant: Middleware = async (ctx) => {
  try {
    ctx.body = await DishesServices.getDishesByRestaurant(ctx.params.restaurantId);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getActiveDishesByRestaurant: Middleware = async (ctx) => {
  try {
    ctx.body = await DishesServices.getActiveDishesByRestaurant(ctx.params.restaurantId);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getDishesBySection: Middleware = async (ctx) => {
  try {
    ctx.body = await DishesServices.getDishesBySection(ctx.params.sectionId);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getActiveDishesBySection: Middleware = async (ctx) => {
  try {
    ctx.body = await DishesServices.getActiveDishesBySection(ctx.params.sectionId);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const createDish: Middleware = async (ctx) => {
  try {
    const id = await DishesServices.createDish(ctx.request.body, ctx.state.restaurant.id);
    ctx.body = { id };
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const updateDish: Middleware = async (ctx) => {
  try {
    ctx.body = await DishesServices.updateDish(ctx.request.body, ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteDish: Middleware = async (ctx) => {
  try {
    await DishesServices.deleteDish(ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};


