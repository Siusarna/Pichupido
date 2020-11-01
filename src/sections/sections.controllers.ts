import { Middleware } from 'koa';
import * as SectionsServices from './sections.service';

export const getSection: Middleware = async (ctx) => {
  try {
    ctx.body = await SectionsServices.getSection(ctx.params.id);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getSectionByRestaurant: Middleware = async (ctx) => {
  try {
    ctx.body = await SectionsServices.getSectionByRestaurant(ctx.params.restaurantId);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const createSection: Middleware = async (ctx) => {
  try {
    const id = await SectionsServices.createSection(ctx.request.body, ctx.state.restaurant.id);
    ctx.body = { id };
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const updateSection: Middleware = async (ctx) => {
  try {
    ctx.body = await SectionsServices.updateSection(ctx.request.body, ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteSection: Middleware = async (ctx) => {
  try {
    await SectionsServices.deleteSection(ctx.state.restaurant.id, ctx.params.id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};


