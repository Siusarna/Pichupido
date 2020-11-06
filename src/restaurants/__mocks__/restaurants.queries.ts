/* eslint-disable @typescript-eslint/no-unused-vars */
import { Restaurant, RestaurantData, RestaurantDataOptional } from '../restaurants.types';
import { DefaultDbMock } from '../../testing.utils/dbMock';

const db = new DefaultDbMock<Restaurant, RestaurantData & { adminId: number }, RestaurantDataOptional>();
export const __setDbData = db.__setDbData;

export const getRestaurantByUserId = async (userId: number): Promise<Restaurant> => {
  return await db.selectOne((restaurant) =>
    restaurant.adminId === userId
  );
}

export const getRestaurantById = async (id: number): Promise<Restaurant> => {
  return await db.selectOne((restaurant) =>
    restaurant.id === id
  );
}

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  return await db.selectMany((_restaurant) => true);
}

export const insertRestaurant = db.insert;
export const updateRestaurant = db.update;
export const deleteRestaurant = db.delete;