import type { IProduct } from "@/interfaces/IProduct";
import { PublicAPI } from "../BaseAPI";
import type { ProductFormData } from "@/Schema/addProduct";

export async function getProducts(categoryId?: string , search?: string ) {
  const url =
    (categoryId && search )?
        `/api/products?filters[categories][id][$eq]=${categoryId}&filters[title][$containsi]=${search}&populate=thumbnail`
    :
    categoryId ? 
        `/api/products?filters[categories][id][$eq]=${categoryId}&populate=thumbnail`
    :   
    search ?
        `/api/products?filters[title][$containsi]=${search}&populate=thumbnail`
    :
        `/api/products?populate=thumbnail`;

  const response = await PublicAPI.get(url);

  return response.data.data;
}
export async function addProducts(product : ProductFormData){
    const response = await PublicAPI.post("/api/products" ,{
        data : product
    });
    return response.data.data;
}
export async function getProductsByID(id : string){
    const response = await PublicAPI.get(`/api/products/${id}?populate=thumbnail`);
    return response.data.data;
}