import axios from "axios";
import { API } from "../BaseAPI";

export async function getProducts(categoryId?: string , search?: string ) {
  const url =
    (categoryId && search )?
        `${API}/api/products?filters[categories][id][$eq]=${categoryId}&filters[title][$containsi]=${search}&populate=thumbnail`
    :
    categoryId ? 
        `${API}/api/products?filters[categories][id][$eq]=${categoryId}&populate=thumbnail`
    :   
    search ?
        `${API}/api/products?filters[title][$containsi]=${search}&populate=thumbnail`
    :
        `${API}/api/products?populate=thumbnail`;

  const response = await axios.get(url);

  return response.data.data;
}
export async function getProductsByID(id : string){
    const response = await axios.get(`${API}/api/products/${id}?populate=thumbnail`);
    return response.data.data;
}