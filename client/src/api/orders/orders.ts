import { PrivateAPI, PublicAPI } from "../BaseAPI";
import type { IOrder} from "@/interfaces/IOrder";

export async function addOrder(order:IOrder) {
  const response = await PrivateAPI.post(`/api/orders`, {
    data: order,
  });

  return response.data.data;
}
export async function getOrder() {
  const response = await PublicAPI.get("/api/orders");
  return response.data.data;
}
export async function getOrderById(id: string) {
  const response = await PublicAPI.get(
    `/api/orders/${id}?populate[order_items][populate][product][populate]=thumbnail`
  );
  return response.data.data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const response = await PublicAPI.put(`/api/orders/${orderId}`, {
    data: { orderStatus: status },
  });
  return response.data.data;
}

export const deleteOrder = async (orderId: string) => {
  const response = await PublicAPI.delete(`/api/orders/${orderId}`);
  return response.data;
};