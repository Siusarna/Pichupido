
export interface Menu {
  id: number,
  restaurantId: number,
  name: string,
  isActive: boolean,
}

export interface MenuData {
  name: string,
}

export interface MenuDataOptional {
  name?: string,
  isActive?: boolean,
}
