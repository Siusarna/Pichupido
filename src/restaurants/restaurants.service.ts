import * as queries from './restaurants.queries';
import { Restaurant, RestaurantData, RestaurantDataOptional } from './restaurants.types';
import { checkImage } from '../utils/checkImg';
import { uploadImage, deleteImage } from '../utils/s3';

export const createRestaurant = async (restaurant: RestaurantData, adminId: number): Promise<number> => {
  if (await queries.getRestaurantByUserId(adminId)) {
    throw ('There already is restaurant with this admin');
  }
  if (!checkImage(restaurant.logo) || !checkImage(restaurant.cover)) {
    throw ('Invalid image');
  }
  restaurant.cover = await uploadImage(restaurant.cover);
  restaurant.logo = await uploadImage(restaurant.logo);

  return await queries.insertRestaurant({ ...restaurant, adminId });
};

export const getRestaurant = async (id: number): Promise<Restaurant> => {
  const restaurant = await queries.getRestaurantById(id);
  if (!restaurant) throw ('There are no restaurants with this id');
  return restaurant;
}

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  return await queries.getAllRestaurants();
}

export const updateRestaurant = async (restaurant: RestaurantDataOptional,
  adminId: number,
  restaurantId: number,
): Promise<void> => {
  const currRestaurant = await queries.getRestaurantById(restaurantId)
  if (!currRestaurant) {
    throw ('There are no restaurants with this id');
  }
  if (currRestaurant.adminId !== adminId) {
    throw ('Only restaurant admin can update restaurant info');
  }

  if (restaurant.logo) {
    if (!checkImage(restaurant.logo)) throw ('Invalid image');
    restaurant.logo = await uploadImage(restaurant.logo);
    await deleteImage(currRestaurant.logo);
  }
  if (restaurant.cover) {
    if (!checkImage(restaurant.cover)) throw ('Invalid image');
    restaurant.cover = await uploadImage(restaurant.cover);
    await deleteImage(currRestaurant.cover);
  }

  await queries.updateRestaurant(restaurant, restaurantId);
};

export const deleteRestaurant = async(adminId: number, restaurantId: number): Promise<void> => {
  const restaurant = await queries.getRestaurantById(restaurantId)
  if (!restaurant) {
    throw ('There are no restaurants with this id');
  }
  if (restaurant.adminId !== adminId) {
    throw ('Only restaurant admin can delete restaurant');
  }

  await deleteImage(restaurant.logo);
  await deleteImage(restaurant.cover);
  await queries.deleteRestaurant(restaurantId);
}
