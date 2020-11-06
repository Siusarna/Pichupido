import * as queries from './dishes.queries';
import { Dish, DishData, DishDataOptional, Dishes } from './dishes.types';
import { checkImage } from '../utils/checkImg';
import { uploadImage, deleteImage } from '../utils/s3';
import { getSectionById } from '../sections/sections.queries';
import { getMenuById } from '../menu/menu.queries';

const formatDishArray = (dishes: Dish[]): Dishes => {
  const result: Dishes = {
    sections: []
  };
  dishes.map((dish) => {
    let section = result.sections.find((section) => section && section.id === dish.sectionId)
    if (!section) {
      result.sections.push({
        id: dish.sectionId,
        name: dish.sectionName,
        menus: [],
      });
      section = result.sections[result.sections.length - 1];
    }

    let menu = section.menus.find((menu) => menu && menu.id === dish.menuId);
    if (!menu) {
      section.menus.push({
        id: dish.menuId,
        name: dish.menuName,
        dishes: [],
      })
      menu = section.menus[section.menus.length - 1];
    }

    menu.dishes.push({
      id: dish.id,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      discount: dish.discount,
      photo: dish.photo,
    })
  });
  return result;
};

export const getDishById = async (id: number): Promise<Dish> => {
  const dish = await queries.getDishById(id);
  if (!dish) {
    throw ('There are no dishes with this id');
  }
  return dish;
};

export const getDishesByRestaurant = async (restaurantId: number): Promise<Dishes> => {
  return formatDishArray(await queries.getDishesByRestaurant(restaurantId));
};

export const getActiveDishesByRestaurant = async (restaurantId: number): Promise<Dishes> => {
  return formatDishArray(await queries.getActiveDishesByRestaurant(restaurantId));
};

export const getDishesBySection = async (sectionId: number): Promise<Dishes> => {
  return formatDishArray(await queries.getDishesBySection(sectionId));
};

export const getActiveDishesBySection = async (sectionId: number): Promise<Dishes> => {
  return formatDishArray(await queries.getActiveDishesBySection(sectionId));
};

export const createDish = async (dish: DishData, restaurantId: number): Promise<number> => {
  const section = await getSectionById(dish.sectionId);
  if (!section) {
    throw ('Invalid section id');
  }

  const menu = await getMenuById(dish.menuId);
  if (!menu) {
    throw ('Invalid menu id');
  }

  if (restaurantId !== section.restaurantId || restaurantId !== menu.restaurantId) {
    throw ('Section or menu does not belong to your restautant');
  }

  if (!checkImage(dish.photo)) {
    throw ('Invalid photo');
  }
  dish.photo = await uploadImage(dish.photo);

  return await queries.insertDish(dish);
};

export const updateDish = async (
  dish: DishDataOptional,
  restaurantId: number,
  dishId: number,
): Promise<void> => {
  const currDish = await queries.getDishById(dishId);
  if (!currDish) {
    throw ('There are no dishes with this id');
  }

  if (dish.sectionId) {
    const section = await getSectionById(dish.sectionId);
    if (!section || restaurantId !== section.restaurantId) {
      throw ('Invalid section id');
    }
  }

  if (dish.menuId) {
    const menu = await getMenuById(dish.menuId);
    if (!menu || restaurantId !== menu.restaurantId) {
      throw ('Invalid menu id');
    }
  }

  if (dish.photo) {
    if (!checkImage(dish.photo)) {
      throw ('Invalid photo');
    }
    dish.photo = await uploadImage(dish.photo);
    await deleteImage(currDish.photo);
  }

  return await queries.updateDish(dish, dishId);
};

export const deleteDish = async (restaurantId: number, dishId: number): Promise<void> => {
  const dish = await queries.getDishById(dishId);
  if (!dish) {
    throw ('There are no dishes with this id');
  }
  const section = await getSectionById(dish.sectionId);
  if (restaurantId !== section.restaurantId) {
    throw ('This dish doesn\'t belong to your restaurant');
  }

  await deleteImage(dish.photo);
  await queries.deleteDish(dishId);
}
