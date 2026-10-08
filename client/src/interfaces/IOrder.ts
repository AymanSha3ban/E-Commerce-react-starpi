import type { IProduct } from "./IProduct";

export interface IOrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  product?:IProduct ;
}

export interface IOrder {
  id?: number;
  documentId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  total: number;
  orderStatus: string;
  order_items: IOrderItem[];
  createdAt?: string;
  updatedAt?: string;
}