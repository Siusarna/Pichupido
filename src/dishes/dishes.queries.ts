import { getUpdateClauses, getInsertClauses, getSelectClause } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { Dish, DishData, DishDataOptional } from './dishes.types';

const dishProps = {
  id: { source: 'Dish' },
  name: { source: 'Dish' },
  description: { source: 'Dish' },
  photo: { source: 'Dish' },
  price: { source: 'Dish' },
  discount: { source: 'Dish' },
  sectionId: { dbAlias: 'section_id', source: 'Dish' },
  sectionName: { dbAlias: 'name', source: 'Dish_section' },
  menuId: { dbAlias: 'menu_id', source: 'Dish' },
  menuName: { dbAlias: 'name', source: 'Menu' },
};

export const getDishById = async (id: number): Promise<Dish> => {
  const selectClause = getSelectClause(dishProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Dish
  INNER JOIN Menu ON Dish.menu_id = Menu.id
  INNER JOIN Dish_section ON Dish.section_id = Dish_section.id
  WHERE Dish.id = $1
  `, [id])).rows[0];
}

export const getDishesByRestaurant = async (restaurantId: number): Promise<Dish[]> => {
  const selectClause = getSelectClause(dishProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Dish
  INNER JOIN Menu ON Dish.menu_id = Menu.id
  INNER JOIN Dish_section ON Dish.section_id = Dish_section.id
  WHERE Menu.restaurant_id = $1
  `, [restaurantId])).rows as Dish[];
}

export const getActiveDishesByRestaurant = async (restaurantId: number): Promise<Dish[]> => {
  const selectClause = getSelectClause(dishProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Dish
  INNER JOIN Menu ON Dish.menu_id = Menu.id
  INNER JOIN Dish_section ON Dish.section_id = Dish_section.id
  WHERE Menu.restaurant_id = $1
    AND Menu.active = TRUE
  `, [restaurantId])).rows as Dish[];
}

export const getDishesBySection = async (sectionId: number): Promise<Dish[]> => {
  const selectClause = getSelectClause(dishProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Dish
  INNER JOIN Menu ON Dish.menu_id = Menu.id
  INNER JOIN Dish_section ON Dish.section_id = Dish_section.id
  WHERE section_id = $1
  `, [sectionId])).rows as Dish[];
}

export const getActiveDishesBySection = async (sectionId: number): Promise<Dish[]> => {
  const selectClause = getSelectClause(dishProps);
  return (await query(`
  SELECT ${selectClause}
  FROM Dish
  INNER JOIN Menu ON Dish.menu_id = Menu.id
  INNER JOIN Dish_section ON Dish.section_id = Dish_section.id
  WHERE Dish.section_id = $1
    AND Menu.active = TRUE
  `, [sectionId])).rows as Dish[];
}

export const insertDish = async (dish: DishData): Promise<number> => {
  const [props, values, valueIdxs] = getInsertClauses(dish, dishProps);
  return (await query(`
  INSERT INTO Dish(${props})
  VALUES(${valueIdxs})
  RETURNING *
  `, values)).rows[0].id;
}


export const updateDish = async (dish: DishDataOptional, id: number): Promise<void> => {
  const [updateClause, values, nextIndx] = getUpdateClauses(dish, dishProps);
  await query(`
  UPDATE Dish 
  SET ${updateClause}
  WHERE id = $${nextIndx}
  `, [...values, id]);
}

export const deleteDish = async (id: number): Promise<void> => {
  await query(`
  DELETE FROM Dish
  WHERE id = $1
  `, [id]);
}