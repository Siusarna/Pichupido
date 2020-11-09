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

export enum PaymentMethod {
  CREDIT_CARD = 'online',
  CASH = 'offline',
}

export enum OrderStatus {
  WAITING_FOR_CONFIRMATION = 'waiting_for_confirmation',
  WAITING_FOR_SERVING = 'waiting_for_serving',
  CLOSED = 'closed'
}

export interface Cart {
  dishes: {
    id: number,
    amount: number,
    price: number,
    name: number,
  }[]
}

export interface Order {
  kitchenNotes: string,
  paymentMethod: PaymentMethod,
  paid: number,
  tableId: number,
  status?: OrderStatus
  cart: Cart,
  stripePaymentIntentId?: string;
}

export interface OrderOptional {
  kitchenNotes?: string;
  paymentMethod?: PaymentMethod;
  paid?: number;
  cart?: Cart;
  status?: OrderStatus;
  stripePaymentIntentId?: string;
}
