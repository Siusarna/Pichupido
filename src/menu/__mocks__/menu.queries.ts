/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, MenuData, MenuDataOptional } from '../menu.types';
import { DefaultDbMock } from '../../testing.utils/dbMock';

const db = new DefaultDbMock<Menu, MenuData &  { restaurantId: number }, MenuDataOptional>();
export const __setDbData = db.__setDbData;

export const getMenuByName = async (name: string, restaurantId: number): Promise<Menu | undefined> => {
  return await db.selectOne((section) =>
    section.name === name && section.restaurantId === restaurantId
  );
};

export const getMenuById = async (id: number): Promise<Menu | undefined> => {
  return await db.selectOne((section) =>
    section.id === id
  );
}

export const getMenusByRestaurant = async (restaurantId: number): Promise<Menu[]> => {
  return await db.selectMany((section) =>
    section.restaurantId === restaurantId
  );
}

export const insertMenu = db.insert;

export const updateMenu = db.update;

export const deleteMenu = db.delete;