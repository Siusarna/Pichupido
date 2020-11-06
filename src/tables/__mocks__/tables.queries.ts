/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultDbMock } from '../../testing.utils/dbMock';
import { Table } from '../tables.types';

const db = new DefaultDbMock<Table, { restaurantId: number }, { url?: string, qrCodeUrl?: string }>();
export const __setDbData = db.__setDbData;

export const getTableById = async (id: number): Promise<Table> => {
  return await db.selectOne((table) =>
    table.id === id
  );
}

export const getTableByRestaurant = async (restaurantId: number): Promise<Table[]> => {
  return await db.selectMany((table) =>
    table.restaurantId === restaurantId
  );
}

export const insertTable = db.insert;

export const setUrl = async (_tableId: number, _url: string, _qrCodeUrl: string): Promise<void> => {
  return;
}

export const deleteTable = db.delete;