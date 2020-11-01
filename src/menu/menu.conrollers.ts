import { Middleware } from 'koa';
import * as MenuServices from './menu.service';

export const getMenu: Middleware = async (ctx) => {
  try {
    ctx.body = await MenuServices.getMenu(ctx.params.id);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getMenusByRestaurant: Middleware = async (ctx) => {
  try {
    ctx.body = await MenuServices.getMenusByRestaurant(ctx.params.restaurantId);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const createMenu: Middleware = async (ctx) => {
  try {
    const id = await MenuServices.createMenu(ctx.request.body, ctx.state.restaurant.id);
    ctx.body = { id };
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const updateMenu: Middleware = async (ctx) => {
  try {
    ctx.body = await MenuServices.updateMenu(ctx.request.body, ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteMenu: Middleware = async (ctx) => {
  try {
    await MenuServices.deleteMenu(ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const activateMenu: Middleware = async (ctx) => {
  try {
    ctx.body = await MenuServices.updateMenu({ isActive: true }, ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};


export const deactivateMenu: Middleware = async (ctx) => {
  try {
    ctx.body = await MenuServices.updateMenu({ isActive: false }, ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};
