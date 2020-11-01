import { getUpdateClauses, getInsertClauses, getSelectClause } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { Table } from './tables.types';

const tableProps = {
  id: {},
  restaurantId: { dbAlias: 'restaurant_id' },
  url: {},
  qrCodeUrl: { dbAlias: 'qr_code_url' },
};

export const getTableById = async(id: number): Promise<Table> => {
  const selectClause = getSelectClause(tableProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM "Table"
  WHERE id = $1
  `, [id])).rows[0];
}

export const getTableByRestaurant = async(restaurantId: number): Promise<Table[]> => {
  const selectClause = getSelectClause(tableProps);
  return (await query(`
  SELECT ${selectClause} 
  FROM "Table"
  WHERE restaurant_id = $1
  `, [restaurantId])).rows;
}

export const insertTable = async(restaurantId: number): Promise<number> => {
  const [props, values, valueIdxs] = getInsertClauses({ restaurantId }, tableProps);
  return (await query(`
  INSERT INTO "Table"(${props})
  VALUES(${valueIdxs})
  RETURNING *
  `, values)).rows[0].id;
}


export const setUrl = async(tableId: number, url: string, qrCodeUrl: string): Promise<void> => {
  const [updateClause, values, nextIndx] = getUpdateClauses({ url, qrCodeUrl }, tableProps);
  await query(`
  UPDATE "Table" 
  SET ${updateClause}
  WHERE id = $${nextIndx}
  `, [...values, tableId]);
}

export const deleteTable = async(id: number): Promise<void> => {
  await query(`
  DELETE FROM "Table"
  WHERE id = $1
  `, [id]);
}