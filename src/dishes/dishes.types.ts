export interface Dish {
  id: number,
  name: string,
  description: string,
  photo: string,
  price: number,
  discount: number,
  sectionId: number,
  menuId: number,
  sectionName: string,
  menuName: string,
}

export interface DishData {
  name: string,
  description: string,
  photo: string,
  price: number,
  sectionId: number,
  menuId: number,
  discount?: number,
}

export interface DishDataOptional {
  name?: string,
  description?: string,
  photo?: string,
  price?: number,
  discount?: number,
  sectionId?: number,
  menuId?: number,
}

export type Dishes = {
  sections: {
    id: number,
    name: string
    menus: {
      id: number,
      name: string,
      dishes: {
        id: number,
        name: string,
        description: string,
        photo: string,
        price: number,
        discount: number,
      }[]
    }[]
  }[]
}