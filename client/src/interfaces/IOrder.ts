import type { IProduct } from "./IProduct";

// Order Interfaces
export interface IOrderItem {
  product: IProduct;
  quantity: number;
  unitPrice: number;
}

export interface IOrder {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  total: number;
  orderStatus: string;
  order_items: IOrderItem[];
}

// Input interfaces for creating an order & API request
export interface IOrderItemInput {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  total: number;
  orderStatus: string;
  order_items: IOrderItemInput[];
}