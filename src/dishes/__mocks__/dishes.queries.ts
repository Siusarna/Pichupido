import { Dish, DishData, DishDataOptional } from '../dishes.types';
import { DefaultDbMock } from '../../testing.utils/dbMock';

const db = new DefaultDbMock<
  Dish & { isActive: boolean }, 
  DishData & { adminId: number }, 
  DishDataOptional
>();

let getRestaurantIdByMenu: (menuId: number) => number;

export const __setMenuRestaurantRelation = (fn: (menuId: number) => number): void => {
  getRestaurantIdByMenu = fn;
}
export const __setDbData = db.__setDbData;

export const getDishById = async (id: number): Promise<Dish> => {
  return await db.selectOne((dish) => dish.id === id);
}

export const getDishesByRestaurant = async (restaurantId: number): Promise<Dish[]> => {
  return await db.selectMany((dish) => (
    getRestaurantIdByMenu(dish.menuId) === restaurantId
  ));
}

export const getActiveDishesByRestaurant = async (restaurantId: number): Promise<Dish[]> => {
  return await db.selectMany((dish) => (
    getRestaurantIdByMenu(dish.menuId) === restaurantId
    && dish.isActive
  ));
}

export const getDishesBySection = async (sectionId: number): Promise<Dish[]> => {
  return await db.selectMany((dish) => (
    dish.sectionId === sectionId
  ));
}

export const getActiveDishesBySection = async (sectionId: number): Promise<Dish[]> => {
  return await db.selectMany((dish) => (
    dish.sectionId === sectionId
    && dish.isActive
  ));
}

export const insertDish = db.insert;
export const updateDish = db.update;
export const deleteDish = db.delete;