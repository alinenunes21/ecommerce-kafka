// src/app/models/order.model.ts

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  timestamp?: string;
  items: OrderItem[];
}

export interface OrderResponse {
  message: string;
  orderId?: string;
}