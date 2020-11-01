import { getUpdateClauses, getInsertClauses, getSelectClause } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { Section, SectionData, SectionDataOptional } from './sections.types';

const sectionProps = {
  id: {},
  name: {},
  restaurantId: { dbAlias: 'restaurant_id' },
};

export const getSectionByName = async(name: string, restaurantId: number): Promise<Section> => {
  const selectClause = getSelectClause(sectionProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Dish_section
  WHERE name = $1
  AND restaurant_id = $2
  `, [name, restaurantId])).rows[0];
}

export const getSectionById = async(id: number): Promise<Section> => {
  const selectClause = getSelectClause(sectionProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Dish_section
  WHERE id = $1
  `, [id])).rows[0];
}

export const getSectionByRestaurant = async(restaurantId: number): Promise<Section[]> => {
  const selectClause = getSelectClause(sectionProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM Dish_section
  WHERE restaurant_id = $1
  `, [restaurantId])).rows;
}

export const insertSection = async(section: SectionData & { restaurantId: number }): Promise<number> => {
  const [props, values, valueIdxs] = getInsertClauses(section, sectionProps);
  return (await query(`
  INSERT INTO Dish_section(${props})
  VALUES(${valueIdxs})
  RETURNING *
  `, values)).rows[0].id;
}


export const updateSection = async(section: SectionDataOptional, id: number): Promise<void> => {
  const [updateClause, values, nextIndx] = getUpdateClauses(section, sectionProps);
  await query(`
  UPDATE Dish_section 
  SET ${updateClause}
  WHERE id = $${nextIndx}
  `, [...values, id]);
}

export const deleteSection = async(id: number): Promise<void> => {
  await query(`
  DELETE FROM Dish_section
  WHERE id = $1
  `, [id]);
}