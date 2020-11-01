import { getQrCode } from '../utils/qrCode';
import * as queries from './tables.queries';
import { Table } from './tables.types';
import { uploadImage, deleteImage } from '../utils/s3';

const createTableUrl = (tableId: number, restaurantId: number) => (
  `https://pichupido-user.herokuapp.com/restaurants/${restaurantId}?tableNumber=${tableId}`
)

export const createTable = async (restaurantId: number): Promise<number> => {
  const tableId = await queries.insertTable(restaurantId);
  const url = createTableUrl(tableId, restaurantId);
  const qrCode = await getQrCode(url);
  const qrCodeUrl = await uploadImage(qrCode);

  queries.setUrl(tableId, url, qrCodeUrl);

  return tableId;
}

export const getTable = async (id: number): Promise<Table> => {
  const table = await queries.getTableById(id);
  if (!table) {
    throw('There is no table with this id');
  }
  return table;
}

export const getTablesByRestaurant = async (restaurantId: number): Promise<Table[]> => {
  return await queries.getTableByRestaurant(restaurantId);
}

export const deleteTable = async(restaurantId: number, tableId: number): Promise<void> => {
  const currTable = await queries.getTableById(tableId);
  if (!currTable) {
    throw('There is no table with this id');
  }
  if (currTable.restaurantId !== restaurantId) {
    throw('This table does not belong to your restaurant');
  }
  await deleteImage(currTable.qrCodeUrl);
  await queries.deleteTable(tableId);
}
