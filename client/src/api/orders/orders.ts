import axios from "axios";
import { API } from "../BaseAPI";
import type { IOrderInput } from "@/interfaces/IOrder";


export async function addOrder(order:IOrderInput) {
  const response = await axios.post(`${API}/api/orders`, {
    data: order,
  });

  return response.data.data;
}