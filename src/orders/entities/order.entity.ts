// simple order interface
// order includes an array with the items [{ productId, quantity, variantId }]

export interface Order {
  id: string;
  customerId: string;
  courierId: string;
  storeId: string;
  products: OrderItem[];
  totalPrice?: number;
  paymentStatus?: PaymentStatus;
  paymentMethod: PaymentMethod;
  customerLocation: Location;
  deliveryLocation?: Location;
  businessLocation?: Location;
  orderStatus?: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  variantId?: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  ON_ROUTE = 'ON_ROUTE',
  DELIVERED = 'DELIVERED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

export interface Location {
  lat: number;
  lng: number;
}
