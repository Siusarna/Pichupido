export interface Restaurant {
  id: string,
  adminId: number,
  name: string,
  workingHours: string,
  location: string,
  cover: string,
  logo: string,
}

export interface RestaurantData {
  name: string,
  workingHours: string,
  location: string,
  cover: string,
  logo: string,
}

export interface RestaurantDataOptional {
  name?: string,
  workingHours?: string,
  location?: string,
  cover?: string,
  logo?: string,
}
