import axios from "axios";
import { API } from "../BaseAPI";

export async function getProducts(){
    const response = await axios.get(`${API}/api/products?populate=thumbnail`);
    return response.data.data;
}
export async function getProductsByID(id : string){
    const response = await axios.get(`${API}/api/products/${id}?populate=thumbnail`);
    return response.data.data;
}