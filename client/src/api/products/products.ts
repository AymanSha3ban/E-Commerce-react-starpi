import axios from "axios";
import { API } from "../BaseAPI";

export async function getProducts(){
    const response = await axios.get(`${API}/products`);
    return response.data.data;
}