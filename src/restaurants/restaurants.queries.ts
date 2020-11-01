import { getUpdateClauses, getInsertClauses, getSelectClause } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { Restaurant, RestaurantData, RestaurantDataOptional } from './restaurants.types';

const restaurantProps = {
  id: {},
  name: {},
  location: {},
  workingHours: { dbAlias: 'working_hours' },
  logo: { dbAlias: 'logo_url' },
  cover: { dbAlias: 'cover_url' },
  adminId: { dbAlias: 'admin_id' },
};

export const getRestaurantByUserId = async(userId: number): Promise<Restaurant> => {
  const selectClause = getSelectClause(restaurantProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Restaurant
  WHERE admin_id = $1
  `, [userId])).rows[0];
}

export const getAllRestaurants = async(): Promise<Restaurant[]> => {
  const selectClause = getSelectClause(restaurantProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Restaurant
  `)).rows;
}

export const getRestaurantById = async(id: number): Promise<Restaurant> => {
  const selectClause = getSelectClause(restaurantProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Restaurant
  WHERE id = $1
  `, [id])).rows[0];
}

export const insertRestaurant = async(restaurant: RestaurantData & { adminId: number }): Promise<number> => {
  const [props, values, valueIdxs] = getInsertClauses(restaurant, restaurantProps);
  return (await query(`
  INSERT INTO Restaurant(${props})
  VALUES(${valueIdxs})
  RETURNING *
  `, values)).rows[0].id;
}


export const updateRestaurant = async(restaurant: RestaurantDataOptional, id: number): Promise<void> => {
  const [updateClause, values, nextIndx] = getUpdateClauses(restaurant, restaurantProps);
  await query(`
  UPDATE Restaurant 
  SET ${updateClause}
  WHERE id = $${nextIndx}
  `, [...values, id]);
}

export const deleteRestaurant = async(id: number): Promise<void> => {
  await query(`
  DELETE FROM Restaurant
  WHERE id = $1
  `, [id]);
}