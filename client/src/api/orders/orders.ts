import { useAuthStore } from "@/Store/authStore";
import { PrivateAPI } from "../BaseAPI";
import type { IOrderInput } from "@/interfaces/IOrder";

export async function addOrder(order:IOrderInput) {
  console.log(useAuthStore.getState().token);
  const response = await PrivateAPI.post(`/api/orders`, {
    data: order,
  });

  return response.data.data;
}