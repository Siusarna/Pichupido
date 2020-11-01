import * as queries from './menu.queries';
import { Menu, MenuData, MenuDataOptional } from './menu.types';

export const createMenu = async (menu: MenuData, restaurantId: number): Promise<number> => {
  const currMenu = await queries.getMenuByName(menu.name, restaurantId);
  if (currMenu) {
    throw('There is already menu with this name')
  }
  return await queries.insertMenu({ ...menu, restaurantId })
}

export const getMenu = async (id: number): Promise<Menu> => {
  const menu = await queries.getMenuById(id);
  if (!menu) {
    throw('There is no menu with this id');
  }
  return menu;
}

export const getMenusByRestaurant = async (restaurantId: number): Promise<Menu[]> => {
  return await queries.getMenusByRestaurant(restaurantId);
}

export const updateMenu = async (
  menu: MenuDataOptional,
  restaurantId: number,
  menuId: number,
): Promise<void> => {
  const currMenu = await queries.getMenuById(menuId);
  if (!currMenu) {
    throw('There is no menu with this id');
  }
  if (currMenu.restaurantId !== restaurantId) {
    throw('This menu does not belong to your restaurant');
  }
  await queries.updateMenu(menu, menuId);
};

export const deleteMenu = async(restaurantId: number, menuId: number): Promise<void> => {
  const currMenu = await queries.getMenuById(menuId);
  if (!currMenu) {
    throw('There is no menu with this id');
  }
  if (currMenu.restaurantId !== restaurantId) {
    throw('This menu does not belong to your restaurant');
  }
  await queries.deleteMenu(menuId);
}
