export interface Restaurant {
  id: number,
  adminId: number,
  name: string,
  workingHours: string,
  location: string,
  cover: string,
  logo: string,
  description: string,
}

export interface RestaurantData {
  name: string,
  workingHours: string,
  location: string,
  cover: string,
  logo: string,
  description: string,
}

export interface RestaurantDataOptional {
  name?: string,
  workingHours?: string,
  location?: string,
  cover?: string,
  logo?: string,
  description?: string,
}
