import { Middleware } from 'koa';
import * as TablesServices from './tables.service';

export const getTable: Middleware = async (ctx) => {
  try {
    ctx.body = await TablesServices.getTable(ctx.params.id);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getTablesByRestaurant: Middleware = async (ctx) => {
  try {
    ctx.body = await TablesServices.getTablesByRestaurant(ctx.params.restaurantId);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const createTable: Middleware = async (ctx) => {
  try {
    const id = await TablesServices.createTable(ctx.state.restaurant.id);
    ctx.body = { id };
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteTable: Middleware = async (ctx) => {
  try {
    await TablesServices.deleteTable(ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};