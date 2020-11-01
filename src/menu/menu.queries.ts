import { getUpdateClauses, getInsertClauses, getSelectClause } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { Menu, MenuData, MenuDataOptional } from './menu.types';

const menuProps = {
  id: {},
  name: {},
  restaurantId: { dbAlias: 'restaurant_id' },
  isActive: { dbAlias: 'active' }
};

export const getMenuByName = async(name: string, restaurantId: number): Promise<Menu> => {
  const selectClause = getSelectClause(menuProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Menu
  WHERE name = $1
  AND restaurant_id = $2
  `, [name, restaurantId])).rows[0];
}

export const getMenuById = async(id: number): Promise<Menu> => {
  const selectClause = getSelectClause(menuProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Menu
  WHERE id = $1
  `, [id])).rows[0];
}

export const getMenusByRestaurant = async(restaurantId: number): Promise<Menu[]> => {
  const selectClause = getSelectClause(menuProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Menu
  WHERE restaurant_id = $1
  `, [restaurantId])).rows;
}

export const insertMenu = async(menu: MenuData & { restaurantId: number }): Promise<number> => {
  const [props, values, valueIdxs] = getInsertClauses(menu, menuProps);
  return (await query(`
  INSERT INTO Menu(${props})
  VALUES(${valueIdxs})
  RETURNING *
  `, values)).rows[0].id;
}


export const updateMenu = async(menu: MenuDataOptional, id: number): Promise<void> => {
  const [updateClause, values, nextIndx] = getUpdateClauses(menu, menuProps);
  await query(`
  UPDATE Menu 
  SET ${updateClause}
  WHERE id = $${nextIndx}
  `, [...values, id]);
}

export const deleteMenu = async(id: number): Promise<void> => {
  await query(`
  DELETE FROM Menu
  WHERE id = $1
  `, [id]);
}